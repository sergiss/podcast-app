import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEpisodeList, getPodcastDetails } from "../../utils/api";
import { Episode, Podcast, PodcastDetail } from "../types";
import { RootState } from "../store";
import fetchTopPodcasts from "./fetchTopPodcasts";
import memoize from "../../utils/memoize";
import fetchPodcastDetail from "./fetchPodcastDetail";

const UPDATE_TIME = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Thunks to fetches the top podcasts from the API and stores them in IndexedDB
 */
const fetchEpisodeDetail = createAsyncThunk<{ episode: Episode }, { podcastId: string; episodeId: string }, {}>(
    "podcastDetail/fetchEpisodeDetail",
    async ({ podcastId, episodeId }, { rejectWithValue, getState, dispatch }) => {
        try {

            let { podcastDetail } = (getState() as RootState).podcastDetail;
            if (!podcastDetail || podcastDetail.id !== podcastId) { 
                const { payload } = await dispatch(fetchPodcastDetail(podcastId)) as { payload: { podcastDetail: PodcastDetail } };
                podcastDetail = payload.podcastDetail;
            }

            const episodes = podcastDetail.episodes;
            const episode = episodes.find((episode) => episode.id === episodeId) as Episode;

            return { episode };
        } catch (error) {
            console.error('Error fetching the podcast:', error);
            return rejectWithValue(error);
        }
    }
);

export default fetchEpisodeDetail;