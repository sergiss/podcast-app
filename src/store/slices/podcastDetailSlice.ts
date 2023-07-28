import { createSlice } from "@reduxjs/toolkit";
import { PodcastDetailState } from '../types';
import fetchPodcastDetail from "../thunks/fetchPodcastDetail";

const initialState: PodcastDetailState = {
  podcastDetail: null,
};

const podcastDetailSlice = createSlice({
  name: "podcastDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPodcastDetail.fulfilled, (state, { payload }) => {
      state.podcastDetail = payload.podcastDetail;
    });
  },
});

export default podcastDetailSlice.reducer;
