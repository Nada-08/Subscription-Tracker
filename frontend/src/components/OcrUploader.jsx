import { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";

const OcrUploader = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5500/api/v1/ocr",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFile(null);
      onSuccess(res.data.data);
    } catch (error) {
      console.log(error);
      setError("Failed to extract subscription for image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-2xl mb-4">
      <div className="flex flex-col items-start gap-3 mb-3">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md inline-block"
        >
          {file ? "Change File" : "Choose Image"}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selected = e.target.files[0];
            console.log("Selected file:", selected);
            setFile(selected);
          }}
          className="hidden"
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`bg-amber-400 text-black px-4 py-2 rounded ${
          loading ? "cursor-not-allowed opacity-70" : "hover:bg-amber-500"
        }`}
      >
        {loading ? (
          <>
            <Spinner />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          "Upload for OCR"
        )}
      </button>

      {error && <p className="text-red-400 mt-2">{error}</p>}
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="mt-3 mb-2 max-w-xs rounded"
        />
      )}
    </div>
  );
};

export default OcrUploader;
