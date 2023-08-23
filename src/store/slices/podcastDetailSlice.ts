import { createSlice } from "@reduxjs/toolkit";
import { PodcastDetailState } from '../types';
import { fetchEpisodeDetail, fetchPodcastDetail } from "../thunks";

const initialState: PodcastDetailState = {
  podcastDetail: null,
  selectedEpisode: null,
};

const podcastDetailSlice = createSlice({
  name: "podcastDetail",
  initialState,
  reducers: {
    clearPodcastDetail: (state) => {
      state.podcastDetail = null;
    },
    clearSelectedEpisode: (state) => {
      state.selectedEpisode = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPodcastDetail.fulfilled, (state, { payload }) => {
      state.podcastDetail = payload.podcastDetail;
    }).addCase(fetchEpisodeDetail.fulfilled, (state, { payload }) => {
      state.selectedEpisode = payload.episode;
    });
  },
});

export const { clearPodcastDetail, clearSelectedEpisode } = podcastDetailSlice.actions;

export default podcastDetailSlice.reducer;
