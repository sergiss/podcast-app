import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { formatDuration, formatDateToDMY, getTextContentByTagName } from "..";
import { Episode } from "../../store/types";

const BASE_URL = "https://itunes.apple.com";
const CORS_ANYWHERE_URL = "https://cors-anywhere.herokuapp.com/";

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.url = `${CORS_ANYWHERE_URL}${config.url}`;
  return config;
});

interface TopPodcastParams {
  limit?: number;
  genre?: string;
}

/**
 * Returns a list of top podcasts from iTunes
 * @param param0 limit: number, genre: string
 * @returns top podcasts
 */
export const getTopPodcasts = async ({
  limit = 100,
  genre = "1310", // Default Music
}: TopPodcastParams = {}) => {
  const response = await instance.get(
    `${BASE_URL}/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`
  );
  return response.data;
};

interface PodcastDetails {
  resultCount: number;
  results: {
    feedUrl: string;
    // other fields...
  }[];
}

/**
 * Returns information about a podcast (feedUrl is the interesting field)
 * @param podcastId id of the podcast
 * @returns podcast details
 */
export const getPodcastDetails = async (
  podcastId: string
): Promise<PodcastDetails> => {
  const response: AxiosResponse<PodcastDetails> = await instance.get(
    `${BASE_URL}/lookup?id=${podcastId}`
  );
  return response.data;
};

/**
 * Returns a list of episodes from a podcast (process the XML response)
 * @param feedUrl url of the podcast feed
 * @returns list of episodes
 */
export const getEpisodeList = async (feedUrl: string) => {
  const response: AxiosResponse<string> = await instance.get(feedUrl);
  const xmlDocument = new DOMParser().parseFromString(
    response.data,
    "text/xml"
  );
  const collection: NodeList = xmlDocument.querySelectorAll("item");
  const episodes = Array.from(collection).map((item: Node) => ({
    id: getTextContentByTagName(item, "guid"),
    title: getTextContentByTagName(item, "title"),
    pubDate: formatDateToDMY(getTextContentByTagName(item, "pubDate")),
    duration: formatDuration(getTextContentByTagName(item, "itunes:duration")),
    description: getTextContentByTagName(item, "description"),
    audioUrl: (item as Element).querySelector("enclosure")?.getAttribute("url"),
  }));
  return episodes as Episode[];
};
