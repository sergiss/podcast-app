import { createAsyncThunk } from "@reduxjs/toolkit";
import { Podcast } from "../types";

const fetchTopPodcasts = createAsyncThunk<{ podcasts: Podcast[] }, void, {}>(
  "podcast/fetchTopPodcasts",
  async (_arg, { rejectWithValue }) => {
    try {

      const podcasts: Podcast[] = [];

      return { podcasts };
    } catch (error) {
      console.error('Error fetching the podcasts:', error);
      return rejectWithValue(error);
    }
  }
);

export default fetchTopPodcasts;
