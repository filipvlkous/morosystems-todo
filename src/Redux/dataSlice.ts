import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  completeAllVisibleTasks,
  createNewDoc,
  deleteAllCompleted,
  deleteDoc,
  getAllItems,
  getCompletedItems,
  saveTaskName,
  updateDocCompleted,
  updateDocIncompleted,
} from "./actions";
import { ItemTypes, ReduxStateType } from "../Types";

const initialState: ReduxStateType = {
  data: [],
  isLoading: true,
  error: false,
};

const setLoading = (state: ReduxStateType) => {
  state.isLoading = true;
};

const setError = (state: ReduxStateType) => {
  state.isLoading = false;
  state.error = true;
};

const setData = (state: ReduxStateType, action: PayloadAction<any>) => {
  state.isLoading = false;
  state.data = action.payload;
};

const dataSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCompleted: (state) => {
      console.log(state);
      state.data = state.data.filter((item) => item.completed);
    },
    getIncomplete: (state) => {
      state.data = state.data.filter((item) => !item.completed);
    },
  },
  extraReducers: (builder) => {
    builder
      // get all items
      .addCase(getAllItems.pending, setLoading)
      .addCase(getAllItems.fulfilled, setData)
      .addCase(getAllItems.rejected, setError)
      //get completed items
      .addCase(getCompletedItems.pending, setLoading)
      .addCase(getCompletedItems.fulfilled, setData)
      .addCase(getCompletedItems.rejected, setError)
      //create new doc
      // .addCase(createNewDoc.pending, setLoading)
      .addCase(createNewDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createNewDoc.rejected, setError)
      //delete doc
      .addCase(deleteDoc.pending, setLoading)
      .addCase(deleteDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload == undefined) return;
        state.data = action.payload;
      })
      .addCase(deleteDoc.rejected, setError)
      // delete all completed
      .addCase(deleteAllCompleted.pending, setLoading)
      .addCase(deleteAllCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(deleteAllCompleted.rejected, setError)
      //update doc complete
      // .addCase(updateDocCompleted.pending, setLoading)
      .addCase(updateDocCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex(
          (doc) => doc.id === action.payload.id
        );

        const updatedDocs = [...state.data];
        updatedDocs[index] = {
          ...updatedDocs[index],
          ["completed"]: true,
        };

        state.data = updatedDocs;
      })
      .addCase(updateDocCompleted.rejected, setError)
      //update doc incomplete
      // .addCase(updateDocIncompleted.pending, setLoading)
      .addCase(updateDocIncompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex(
          (doc) => doc.id === action.payload.id
        );

        const updatedDocs = [...state.data];
        updatedDocs[index] = {
          ...updatedDocs[index],
          ["completed"]: false,
        };

        state.data = updatedDocs;
      })
      .addCase(updateDocIncompleted.rejected, setError)
      // update task name
      .addCase(saveTaskName.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedData = state.data.map((item:ItemTypes) => {
          if (item.id === action.payload.id) {
            return { ...item, text: action.payload.text };
          }
          return item;
        });

        state.data = updatedData;

      })
      .addCase(saveTaskName.rejected, setError)
      // complete all visible tasks
      .addCase(completeAllVisibleTasks.pending, setLoading)
      .addCase(completeAllVisibleTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(completeAllVisibleTasks.rejected, setError);
  },
});

export const { getCompleted, getIncomplete } = dataSlice.actions;
export default dataSlice.reducer;
