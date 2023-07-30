import { createSlice } from "@reduxjs/toolkit";
import { PodcastListState } from "../types";
import { fetchTopPodcasts } from "../thunks";

const initialState: PodcastListState = {
  podcasts: []
};

const podcastListSlice = createSlice({
  name: "podcastList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopPodcasts.fulfilled, (state, { payload }: any) => {
      state.podcasts = payload.podcasts;
    });
  },
});

export default podcastListSlice.reducer;
