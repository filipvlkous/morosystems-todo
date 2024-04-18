import React from "react";
import { ItemTypes } from "../Types";

const Count: React.FC<{ state: ItemTypes[] }> = ({ state }) => {
  return (
    <p className=" text-yellow-500 font-bold">
      completed tasks:{" "}
      {state.filter((item: ItemTypes) => item.completed).length}
    </p>
  );
};

export default Count;
