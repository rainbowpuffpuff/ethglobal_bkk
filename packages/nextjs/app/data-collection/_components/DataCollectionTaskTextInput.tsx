import { useEffect, useRef, useState } from "react";
import { TextboxTask } from "../[bountyId]/page";

const DataCollectionTaskTextInput = ({ task, step }: { task: TextboxTask; step: number }) => {
  const [inputValue, setInputValue] = useState("");
  const textRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Set focus to the input field on component mount
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="text-2xl font-bold flex-row">{task.textTop}</div>
      <div className="flex gap-2 flex-row">
        <div className="flex gap-2 flex-col">
          {task.textLeft.map((text, index) => (
            <div key={index} ref={textRef} className="text-2xl font-bold">
              {text}
            </div>
          ))}
        </div>
        <div className="relative">
          {/* Custom overlay for placeholder */}
          <div
            className="absolute inset-0 text-2xl font-bold text-gray-400 pointer-events-none"
            style={{
              whiteSpace: "nowrap",
              lineHeight: "1.5",
              width: "500px", // Ensuring line-height consistency
            }}
          >
            {task.textToInput}
          </div>
          {/* Actual input field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="text-2xl font-bold bg-transparent outline-none relative z-10"
            style={{
              lineHeight: "1.5", // Matching line-height
              padding: 0, // Remove padding to avoid offset
              margin: 0, // Remove margin to align text
              color: "black", // Input text color
              backgroundColor: "transparent", // Ensuring the background is clear
              border: "none", // Remove border for seamless look
              width: "500px",
              caretColor: task.textToInput === "" ? "black" : "transparent",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DataCollectionTaskTextInput;
