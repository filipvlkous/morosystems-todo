import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      className=" bg-yellow-500 px-5 py-2 mx-5 rounded-md hover:scale-105 hover:bg-yellow-400 transition-all duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
