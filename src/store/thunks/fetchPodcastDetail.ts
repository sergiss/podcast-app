import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEpisodeList, getPodcastDetails } from "../../utils/api";
import { Podcast, PodcastDetail } from "../types";
import { RootState } from "../store";
import fetchTopPodcasts from "./fetchTopPodcasts";
import memoize from "../../utils/memoize";
import { setLoading } from "../slices/globalSlice";

const UPDATE_TIME = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Thunk that fetches podcast details, using memoization to prevent unnecessary API calls.
 * It combines data from a podcast and its episodes to create a detailed podcast object.
 */
const fetchPodcastDetail = createAsyncThunk<
  { podcastDetail: PodcastDetail },
  string,
  object
>(
  "podcastDetail/fetchPodcastDetail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      dispatch(setLoading(true));
      const podcastDetail = await memoize<PodcastDetail>({
        key: `podcast-${id}`,
        updateTime: UPDATE_TIME,
        update: async () => {
          let { podcasts } = (getState() as RootState).podcastList;
          if (!podcasts?.length) {
            // if the podcasts are not in the store, fetch them
            const { payload } = (await dispatch(fetchTopPodcasts())) as {
              payload: { podcasts: Podcast[] };
            };
            podcasts = payload.podcasts;
          }

          const podcast = podcasts.find(
            (podcast) => podcast.id === id
          ) as Podcast;
          const apiData = await getPodcastDetails(id);
          const episodes = await getEpisodeList(apiData?.results?.[0]?.feedUrl);

          return {
            ...podcast,
            episodes,
          };
        },
      });
      return { podcastDetail };
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default fetchPodcastDetail;
