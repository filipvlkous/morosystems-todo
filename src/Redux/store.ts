
import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './dataSlice'

export const store = configureStore({
    reducer: dataSlice
  });
  
  // Define root state and root dispatch types
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;