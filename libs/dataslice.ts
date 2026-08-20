import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupData, RequestStatus } from "@/interface";

const initialState = {
  signup: null as SignupData | null,
  status: "idle" as RequestStatus,
  error: null as string | null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setSignup: (state, action: PayloadAction<SignupData>) => {
      state.signup = action.payload;
    },
    setStatus: (state, action: PayloadAction<RequestStatus>) => {
      state.status = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    resetSignup: (state) => {
      state.signup = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { setSignup, setStatus, setError, resetSignup } =
  dataSlice.actions;

export default dataSlice.reducer;
