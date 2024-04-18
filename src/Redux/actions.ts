import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemTypes } from "../Types";

// URL to make API requests to
const url = "http://localhost:8080";

/**
 * Gets all tasks from the server
 */
export const getAllItems = createAsyncThunk(
  "cart/getAllItems",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url + "/tasks");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

/**
 * Gets all completed tasks from the server
 */
export const getCompletedItems = createAsyncThunk(
  "cart/getCompletedItems",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url + "/completed");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

/**
 * Creates a new task on the server
 */
export const createNewDoc = createAsyncThunk(
  "users/createNewDoc",
  async (text: string, thunkAPI) => {
    try {
      const resp = await axios.post(url + "/tasks", {
        text,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

/**
 * Deletes multiple tasks from the server
 */
export const deleteDoc = createAsyncThunk(
  "users/deleteDoc",
  async (arr: string[], thunkAPI) => {
    console.log(arr);
    if (arr.length == 0) return;
    try {
      // Array to hold promises for delete requests
      const deletePromises = arr.map(async (element) => {
        await axios.delete(url + "/tasks/" + element);
      });

      // Wait for all delete requests to complete
      await Promise.all(deletePromises);

      // After all delete requests are done, make the GET request
      const resp = await axios.get(url + "/tasks");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

/**
 * Marks a task as completed on the server
 */
export const updateDocCompleted = createAsyncThunk(
  "users/updateDocCompleted",
  async (id: string, thunkAPI) => {
    try {
      const resp = await axios.post(url + "/tasks/" + id + "/complete");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

/**
 * Marks a task as incomplete on the server
 */
export const updateDocIncompleted = createAsyncThunk(
  "users/updateDocIncompleted",
  async (id: string, thunkAPI) => {
    try {
      const resp = await axios.post(url + "/tasks/" + id + "/incomplete");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

/**
 * Deletes all completed tasks from the server
 */
export const deleteAllCompleted = createAsyncThunk(
  "users/deleteAllCompleted",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url + "/tasks/completed");

      const deletePromises = resp.data.map(async (element: ItemTypes) => {
        await axios.delete(url + "/tasks/" + element.id);
      });

      await Promise.all(deletePromises);

      const respNew = await axios.get(url + "/tasks");

      return respNew.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

/**
 * Updates a task's text on the server
 */
export const saveTaskName = createAsyncThunk(
  "users/saveTaskName",
  async ({ id, text }: { id: string; text: string }, thunkAPI) => {
    try {
      await axios.post(url + "/tasks/" + id, {
        text: text,
      });

      return { id, text };
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

/**
 * Completes all visible tasks on the server
 */
export const completeAllVisibleTasks = createAsyncThunk(
  "users/completeAllVisibleTasks",
  async (arr: ItemTypes[], thunkAPI) => {
    try {
        const deletePromises = arr.map(async (element: ItemTypes) => {
        if (!element.completed) {
          await axios.post(url + "/tasks/" + element.id + "/complete");
        }
      });
      await Promise.all(deletePromises);

      if(deletePromises.length <= 0) return arr
      const resp = await axios.get(url + "/tasks");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

