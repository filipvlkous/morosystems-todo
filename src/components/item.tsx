import React, { useState } from "react";
import { ItemTypes } from "../Types";
import {
  saveTaskName,
  updateDocCompleted,
  updateDocIncompleted,
} from "../Redux/actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";

type ItemProps = {
  item: ItemTypes;
  index: number;
  deleteArr: string[];
  addDeleteArr: (id: string) => void;
  selectItem: (id: string) => void;
};
const Item: React.FC<ItemProps> = ({
  item,
  index,
  deleteArr,
  addDeleteArr,
  selectItem,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState(item.text);
  const [clicked, setClicked] = useState(false);
  return (
    <li key={index} className="flex flex-row gap-2 my-1 items-center">
      {deleteArr.includes(item.id) ? (
        <img
          onClick={() => selectItem(item.id)}
          className="w-5 h-5 cursor-pointer"
          src="https://cdn-icons-png.freepik.com/256/87/87932.png?semt=ais_hybrid"
        />
      ) : (
        <div
          onClick={() => selectItem(item.id)}
          className="h-5 w-5 rounded-full border border-black cursor-pointer"
        />
      )}
      {!clicked ? (
        <p
          onClick={() => setClicked(true)}
          className="bg-slate-200  px-2 py-1 rounded-md cursor-pointer"
        >
          {item.text}
        </p>
      ) : (
        <div className="flex gap-2">
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            value={text}
            onClick={() => setClicked(true)}
            className="bg-slate-200 px-2 py-1 rounded-md"
          />
          <button
            onClick={() => {
              dispatch(saveTaskName({ id: item.id, text }));
              setClicked(false);
            }}
            className="px-2 py-1 rounded-md border border-green-500"
          >
            Save
          </button>
          <button
            onClick={() => {
              setText(item.text);
              setClicked(false);
            }}
            className=" px-2 py-1 rounded-md border border-red-500"
          >
            Cancel
          </button>
        </div>
      )}

      {item.completed ? (
        <button
          className="bg-green-500 px-2 py-1 rounded-md"
          onClick={() => dispatch(updateDocIncompleted(item.id))}
        >
          Complete
        </button>
      ) : (
        <button
          className="bg-red-500 px-2 py-1 rounded-md"
          onClick={() => dispatch(updateDocCompleted(item.id))}
        >
          Incomplete
        </button>
      )}
    </li>
  );
};

export default Item;
