import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface SuspenseState {
  loading: boolean;
  error: string | null;
}

const initialState: SuspenseState = {
  loading: false,
  error: null,
};

const suspenseSlice = createSlice({
  name: "suspense",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = suspenseSlice.actions;

export const selectIsLoading = (state: RootState) => state.suspense.loading;
export const selectError = (state: RootState) => state.suspense.error;

export default suspenseSlice.reducer;
