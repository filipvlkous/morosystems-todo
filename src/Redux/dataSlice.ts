import { createSlice } from "@reduxjs/toolkit";
import { fetchUserById,getAllItems  } from "./actions";


const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

 const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;})
      .addCase(fetchUserById.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
  },
});

// console.log(cartSlice);
export const { clearCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
