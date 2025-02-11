import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/fetchSlice";

const store = configureStore({
  reducer: {
    data: dataReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;