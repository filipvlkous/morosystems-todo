import React from "react";
import { AppDispatch } from "../Redux/store";
import { useDispatch } from "react-redux";
import {
  completeAllVisibleTasks,
  deleteAllCompleted,
  deleteDoc,
} from "../Redux/actions";
import { ItemTypes } from "../Types";
import CustomButton from "./buttonCustom";

type ButonContainerProps = {
  filteredArray: ItemTypes[];
  deleteArr: string[];
  setCompleteData: () => void;
  setIncompleteData: () => void;
  setCompleted: (value: string) => void;
  allSelectArr: (arr: ItemTypes[]) => void;
  removeSelected: () => void;
};

const ButtonContainer: React.FC<ButonContainerProps> = ({
  filteredArray,
  deleteArr,
  setCompleteData,
  setIncompleteData,
  setCompleted,
  allSelectArr,
  removeSelected,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="pt-5">
      <CustomButton
        onClick={() => allSelectArr(filteredArray)}
        text="Select all"
      />
      <CustomButton
        onClick={() => {
          removeSelected();
          dispatch(deleteDoc(deleteArr));
        }}
        text="Delete selected"
      />
      <CustomButton
        onClick={() => dispatch(completeAllVisibleTasks(filteredArray))}
        text="Complete all visible tasks"
      />
      <CustomButton
        onClick={() => setCompleteData()}
        text="Get completed tasks"
      />
      <CustomButton
        onClick={() => setIncompleteData()}
        text="Get incomplete tasks"
      />
      <CustomButton onClick={() => setCompleted("")} text="Show all" />
      <CustomButton
        onClick={() => dispatch(deleteAllCompleted())}
        text="Delete all completed"
      />
    </div>
  );
};

export default ButtonContainer;
