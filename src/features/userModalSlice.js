import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
};

export const userModalSlice = createSlice({
  name: "addUserModal",
  initialState,
  reducers: {
    enabledModal(state) {
      state.showModal = true;
    },
    disableModal(state) {
      state.showModal = false;
    },
  },
});

export const { enabledModal, disableModal } = userModalSlice.actions;

export default userModalSlice.reducer;
