import React from "react";
import { IoClose } from "react-icons/io5";

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 rounded-full border-[1px] border-gray-300 hover:bg-gray-100 transition-colors"
    >
      <IoClose size={24} />
    </button>
  );
};

export default CloseButton;
