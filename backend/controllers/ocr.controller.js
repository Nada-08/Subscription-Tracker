import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import mime from "mime-types";
import Subscription from "../models/subscription.model.js";
import { OCR_SPACE_API_KEY, TOGETHER_API_KEY } from "../config/env.js";

export const handleOcr = async (req, res, next) => {
  try {
    const filePath = req.file.path;
    const fileMime = req.file.mimetype;
    const fileExt = mime.extension(fileMime) || "jpg";
    const user = req.user;

    const formData = new FormData();
    formData.append("apikey", OCR_SPACE_API_KEY);
    formData.append("file", fs.createReadStream(filePath));
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("filetype", fileExt);

    const ocrRes = await axios.post(
      "https://api.ocr.space/parse/image",
      formData,
      {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    fs.unlinkSync(filePath);

    const parsedText = ocrRes.data?.ParsedResults?.[0]?.ParsedText;
    if (!parsedText) {
      return res.status(500).json({
        success: false,
        error: "Text extraction failed",
      });
    }

    const llmPrompt = `
You are an intelligent JSON extraction assistant. Your task is to extract a complete subscription object from unstructured text.

Only respond with a pure JSON object (no comments, no markdown, no explanation). Include all the following fields:
- name
- price
- currency (USD, EGP, EUR)
- frequency (daily, weekly, monthly, yearly)
- startDate
- renewalDate
- category (sports, news, entertainment, lifestyle, technology, finance, politics, other)
- paymentMethod
- status (active, cancelled, expired, upcoming)

Today’s date is ${new Date().toISOString().split("T")[0]}.

If the renewalDate is not explicitly provided, and both the startDate and frequency are available, calculate the next renewal date accordingly.

Use the current date to determine status:
- If startDate or renewalDate is in the future → status = "upcoming"
- If renewalDate is in the past → status = "expired"
- If no end/cancel info and renewalDate ≥ today → status = "active"
- If explicitly cancelled → status = "cancelled"

Text:
${parsedText}
`;

    const deepseekRes = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free",
        messages: [{ role: "user", content: llmPrompt }],
        temperature: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawLLMOutput = deepseekRes.data.choices?.[0]?.message?.content || "";
    const match =
      rawLLMOutput.match(/```json\s*([\s\S]*?)\s*```/) ||
      rawLLMOutput.match(/(\{[\s\S]*\})/);
    const cleanJson = match ? match[1] : null;

    if (!cleanJson) {
      return res.status(500).json({
        success: false,
        error: "LLM did not return a valid JSON format.",
        rawOutput: rawLLMOutput,
      });
    }

    const parsed = JSON.parse(cleanJson);

    const subscription = await Subscription.create({
      ...parsed,
      user: user._id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
