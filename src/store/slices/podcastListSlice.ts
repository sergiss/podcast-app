import { createSlice } from "@reduxjs/toolkit";
import { PodcastListState } from "../types";
import fetchTopPodcasts from "../thunks/fetchTopPodcasts";

const initialState: PodcastListState = {
  podcasts: []
};

const podcastListSlice = createSlice({
  name: "podcastList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopPodcasts.fulfilled, (state, { payload }) => {
      state.podcasts = payload.podcasts;
    });
  },
});

export default podcastListSlice.reducer;
