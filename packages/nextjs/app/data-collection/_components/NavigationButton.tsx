import React from "react";

const NavigationButton = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center h-10 rounded-full border-[1px] border-gray-300 hover:bg-gray-100 transition-colors px-5"
    >
      {text}
    </button>
  );
};

export default NavigationButton;
