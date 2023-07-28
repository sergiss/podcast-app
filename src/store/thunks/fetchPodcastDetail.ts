import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEpisodeList, getPodcastDetails } from "../../utils/api";
import { Podcast, PodcastDetail } from "../types";
import { RootState } from "../store";
import fetchTopPodcasts from "./fetchTopPodcasts";
import memoize from "../../utils/memoize";

const UPDATE_TIME = 1000 * 60 * 60 * 24; // 24 hours

/**
 * Thunks to fetches the top podcasts from the API and stores them in IndexedDB
 */
const fetchPodcastDetail = createAsyncThunk<{ podcastDetail: PodcastDetail }, string, {}>(
    "podcastDetail/fetchPodcastDetail",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {

            const podcastDetail = await memoize<PodcastDetail>({
                key: `podcast-${id}`,
                updateTime: UPDATE_TIME,
                update: async () => {

                    let { podcasts } = (getState() as RootState).podcastList;
                    if (!podcasts?.length) { // if the podcasts are not in the store, fetch them
                        const { payload } = await dispatch(fetchTopPodcasts()) as { payload: { podcasts: Podcast[] } };
                        podcasts = payload.podcasts;
                    }

                    const podcast = podcasts.find((podcast) => podcast.id === id) as Podcast;
                    const apiData: any = await getPodcastDetails(id);
                    const episodes = await getEpisodeList(apiData?.results?.[0]?.feedUrl);

                    return {
                        ...podcast,
                        episodes,
                    }

                }
            });
            return { podcastDetail };
        } catch (error) {
            console.error('Error fetching the podcast:', error);
            return rejectWithValue(error);
        }
    }
);

export default fetchPodcastDetail;