import { createAsyncThunk } from "@reduxjs/toolkit";
import { Episode, PodcastDetail } from "../types";
import { RootState } from "../store";
import fetchPodcastDetail from "./fetchPodcastDetail";
import { setLoading } from "../slices/globalSlice";

/**
 * Action to fetch an episode's details given the podcastId and episodeId.
 * It fetches the podcast's details if not present, and returns the specific
 * episode details.
 */
const fetchEpisodeDetail = createAsyncThunk<
  { episode: Episode },
  { podcastId: string; episodeId: string },
  object
>(
  "podcastDetail/fetchEpisodeDetail",
  async ({ podcastId, episodeId }, { rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(setLoading(true));
      let { podcastDetail } = (getState() as RootState).podcastDetail;
      if (!podcastDetail || podcastDetail.id !== podcastId) {
        const { payload } = (await dispatch(fetchPodcastDetail(podcastId))) as {
          payload: { podcastDetail: PodcastDetail };
        };
        podcastDetail = payload.podcastDetail;
      }

      const episodes = podcastDetail.episodes;
      const episode = episodes.find(
        (episode) => episode.id === episodeId
      ) as Episode;

      return { episode };
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default fetchEpisodeDetail;
