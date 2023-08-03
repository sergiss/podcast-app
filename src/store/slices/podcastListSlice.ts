import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Podcast, PodcastListState } from "../types";
import { fetchTopPodcasts } from "../thunks";

const initialState: PodcastListState = {
  podcasts: []
};

const podcastListSlice = createSlice({
  name: "podcastList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTopPodcasts.fulfilled, (state, { payload }: PayloadAction<{podcasts: Podcast[]}>) => {
      state.podcasts = payload.podcasts;
    });
  },
});

export default podcastListSlice.reducer;
