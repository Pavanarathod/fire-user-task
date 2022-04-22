import { configureStore } from "@reduxjs/toolkit";
import userModalSlice from "../features/userModalSlice";

export const store = configureStore({
  reducer: {
    userModel: userModalSlice,
  },
});
