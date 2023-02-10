import React, { useRef, useState, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import fileToBase64 from "../utils/fileToBase64";

const fileTypes = ["JPG", "JPEG", "WEBP", "PNG"];
type stage = 1 | 2 | 3;

const Prompt = () => {
  const [error, setError] = useState<string>("");
  const [stage, setStage] = useState<stage>(1);
  const [file, setFile] = useState<File>();
  const [imageURL, setImageURL] = useState<string>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const uploadImage = async () => {
    if (!inputRef.current || !file) return;

    const file64 = await fileToBase64(file);
    const data = { file: file64, prompt: inputRef.current.value };
    try {
      const res = await fetch("/api/uploadImage", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseBody = await res.json();
      if (!responseBody.imageURL || responseBody.imageURL.length <= 0) {
        setError("Model pool stage error");
        return;
      }
      setImageURL(responseBody.imageURL[0]);
    } catch (e) {
      console.error(e);
      setError("Uploading image failed");
    }
  };

  // stage 1 handler
  const handleFileUpload = async (file: File) => {
    setFile(file);
    setStage(2);
  };

  // stage 2 handler
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current || stage >= 3) return;

    if (e.key === "Enter") {
      setStage(3);
      uploadImage();
    }
  };

  if (error)
    return (
      <div className="font-semibold text-gray-600 px-4 py-2 flex flex-col gap-2 border rounded-md text-center my-4">
        <p>An error occured, please try again later.</p>
        <p>
          Error: <span className="text-pink-600 ">{error}</span>
        </p>
      </div>
    );
  return (
    <div className="my-24">
      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {stage === 1 && (
            <FileUploader
              handleChange={handleFileUpload}
              name="file"
              label="Upload an image here"
              multiple={false}
              types={fileTypes}
            />
          )}
          <div className="border rounded-md flex flex-row divide-x-2 divide-pink-400 h-full divide-dotted shadow-lg">
            {stage >= 2 && (
              <div className={stage === 3 ? "p-8" : ""}>
                <Image
                  src={file ? URL.createObjectURL(file) : ""}
                  alt={"user image"}
                  width={256}
                  height={256}
                />
                <input
                  placeholder="Turn him into a cyborg"
                  className="mt-2 rounded-md px-2 py-1 border-2 focus:border-blue-200 outline-none w-full
                  font-semibold text-sm text-gray-500"
                  ref={inputRef}
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}
            {stage === 3 && (
              <motion.div
                className={!imageURL ? "flex items-center align-center" : ""}
                animate={{ padding: "2rem" }}
              >
                <Image
                  src={imageURL ? imageURL : "/assets/gif/wheel.gif"}
                  alt="user prompt response"
                  width={imageURL ? 256 : 64}
                  height={imageURL ? 256 : 64}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Prompt;
