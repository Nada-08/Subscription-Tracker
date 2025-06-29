import { Router } from "express";
import multer from "multer";
import authorize from '../middlewares/auth.middleware.js';
import { handleOcr } from "../controllers/ocr.controller.js";

const ocrRouter = Router();

const upload = multer({ dest: "uploads/" });

ocrRouter.post("/", authorize, upload.single("image"), handleOcr);

export default ocrRouter;