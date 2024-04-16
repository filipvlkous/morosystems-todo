import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8080/tasks";

export const getAllItems = createAsyncThunk(
    "cart/getCartItems",
    async (name, thunkAPI) => {
      try {
        const resp = await axios(url);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );
  
  export const getCompletedItems = createAsyncThunk(
    "cart/getCartItems",
    async (name, thunkAPI) => {
      try {
        const resp = await axios(url+"/completed");
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
    }
  );
  

  export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId: number, thunkAPI) => {
      const response = userId
      return response
    },
  )