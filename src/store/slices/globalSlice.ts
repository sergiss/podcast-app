import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../types";

const initialState: GlobalState = {
    loading: false,
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        }
    },
});

export const { setLoading } = globalSlice.actions;
export default globalSlice.reducer;
