import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ItemTypes } from "../Types";

const url = "http://localhost:8080";

export const getAllItems = createAsyncThunk(
  "cart/getAllItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(url + "/tasks");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getCompletedItems = createAsyncThunk(
  "cart/getCompletedItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(url + "/completed");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

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

export const deleteDoc = createAsyncThunk(
  "users/deleteDoc",
  async (arr: string[], thunkAPI) => {
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

export const deleteAllCompleted = createAsyncThunk(
  "users/deleteAllCompleted",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(url + "/tasks/completed");

      const deletePromises = resp.data.forEach(async (element: ItemTypes) => {
        await axios.delete(url + "/tasks/" + element.id);
      });

      await Promise.all(deletePromises);

      const respNew = await axios.get(url + "/tasks");

      return respNew.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
