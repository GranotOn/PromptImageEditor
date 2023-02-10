import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const PromptText = "Turn him into a cyborg.";

const Showcase = () => {
  return (
    <motion.section className="mt-12 border rounded-md flex flex-row divide-x-2 divide-pink-400 h-full divide-dotted">
      <div className="p-8 flex flex-col gap-4 items-center">
        <Image
          src="/assets/images/example_before.jpeg"
          alt="image of alexander statue"
          width={256}
          height={256}
        />
        <div className="flex flex-row gap-1 text-gray-500 font-semibold self-center">
          {PromptText.split(" ").map((word, wordIndex) => (
            <p key={`word-${wordIndex}`}>
              {word.split("").map((ch, charIndex) => (
                <motion.span
                  key={`char-${wordIndex}-${charIndex}`}
                  className="opacity-0"
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: (wordIndex + 1) * (charIndex + 1) * 0.04 + 2,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <div className="p-8">
        <motion.div
          variants={{
            hidden: { x: -500, opacity: 0 },
            show: {
              x: 0,
              opacity: 1,
              transition: { delay: 4 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <Image
            src="/assets/images/example_after.png"
            alt="image of alexander statue as a cyborg"
            width={256}
            height={256}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Showcase;
