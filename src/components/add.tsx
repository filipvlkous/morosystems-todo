import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewDoc } from "../Redux/actions";
import { AppDispatch } from "../Redux/store";

export default function Add() {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mt-2 flex gap-5 flex-row items-center pb-4 pt-10">
      <label
        htmlFor="text"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Task:
      </label>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        name="text"
        id="text"
        className="block w-full rounded-md p-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Buy milk"
        value={text}
      />
      <button
        onClick={() => {
          dispatch(createNewDoc(text));
          setText("");
        }}
        type="button"
        className="rounded bg-yellow-500 px-2 py-1 font-semibold text-sm shadow-sm hover:bg-yellow-400 transition-all duration-200"
      >
        Add
      </button>
    </div>
  );
}
