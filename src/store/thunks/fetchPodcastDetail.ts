import { createAsyncThunk } from "@reduxjs/toolkit";
import { PodcastDetail } from "../types";

const fetchPodcastDetail = createAsyncThunk<{ podcastDetail: PodcastDetail }, string, {}>(
    "podcastDetail/fetchPodcastDetail",
    async (id, { rejectWithValue }) => {
        try {

            const podcastDetail = { id, episodes: [] } as PodcastDetail;
           
            return { podcastDetail };
        } catch (error) {
            console.error('Error fetching the podcast:', error);
            return rejectWithValue(error);
        }
    }
);

export default fetchPodcastDetail;