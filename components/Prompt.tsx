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

  const handleChange = async (file: File) => {
    setFile(file);
    const file64 = await fileToBase64(file);
    setStage(2);
    try {
      console.log(file64);
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hey: "hey" }),
      });
      const URI = await res.json();
      console.log(URI);
      setImageURL(URI);
    } catch (e) {
      setError("Uploading image failed");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) return;

    if (e.key === "Enter") {
      console.log("here");
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
              handleChange={handleChange}
              name="file"
              label="Upload an image here"
              multiple={false}
              types={fileTypes}
            />
          )}
          <div>
            {stage >= 2 && (
              <div>
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
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Prompt;
