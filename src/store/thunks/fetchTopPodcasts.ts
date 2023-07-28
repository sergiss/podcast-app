import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTopPodcasts } from "../../utils/api";
import { Podcast } from "../types";
import memoize from "../../utils/memoize";
import { setLoading } from "../slices/globalSlice";

const UPDATE_TIME = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Obtains the data from the API and processes it to return
 * the data that we need (image, title, author, id)
 * @param data raw data from the API
 * @returns processed data
 */
const processTopPodcastData = (data: any) => {
  return data?.feed?.entry?.map((item: any) => {
    const id = item.id.attributes["im:id"];
    const title = item["im:name"].label;
    const author = item["im:artist"].label;
    const summary = item.summary.label;
    const images = item["im:image"];
    const image = images[images.length - 1].label;
    return { id, title, author, summary, image };
  });
};

const simulateSlowNetwork = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Thunks to fetches the top podcasts from the API and stores them in IndexedDB
 */
const fetchTopPodcasts = createAsyncThunk<{ podcasts: Podcast[] }, void, {}>(
  "podcast/fetchTopPodcasts",
  async (_arg, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      await simulateSlowNetwork(5000); // simulate slow network

      const podcasts = await memoize<Podcast[]>({
        key: `topPodcasts`,
        updateTime: UPDATE_TIME,
        update: async () => {
          const apiData = await getTopPodcasts({ limit: 100 });
          const podcasts = processTopPodcastData(apiData); // consume the API
          if (!podcasts) throw new Error(`Invalid data from the API: ${JSON.stringify(apiData)}`);
          return podcasts;
        }
      });

      return { podcasts };
    } catch (error) {
      console.error('Error fetching data:', error);
      return rejectWithValue(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default fetchTopPodcasts;
