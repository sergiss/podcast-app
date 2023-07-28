import axios from 'axios';
import { formatDuration, formatDateToDMY, getTextContentByTagName } from '..';
import { Episode } from '../../store/types';

const BASE_URL = 'https://itunes.apple.com';
const CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/';

const instance = axios.create({
  timeout: 10000,
});

instance.interceptors.request.use((config: any) => {
  config.url = `${CORS_ANYWHERE_URL}${config.url}`;
  return config;
});

interface TopPodcastParams {
  limit?: number;
  genre?: string;
}

export const getTopPodcasts = async ({
  limit = 100,
  genre = '1310', // Default Music
}: TopPodcastParams = {}) => {
  const response = await instance.get(`${BASE_URL}/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`);
  return response.data;
};

export const getPodcastDetails = async (podcastId: string) => {
  const response = await instance.get(`${BASE_URL}/lookup?id=${podcastId}`);
  return response.data;
};

export const getEpisodeList = async (feedUrl: string) => {
  const response: any = await instance.get(feedUrl);
  const xmlDocument = new DOMParser().parseFromString(response.data, "text/xml");
  const collection: NodeList = xmlDocument.querySelectorAll('item');
  const episodes = Array.from(collection).map((item: Node) => ({
    id: getTextContentByTagName(item, 'guid'),
    title: getTextContentByTagName(item, 'title'),
    pubDate: formatDateToDMY(getTextContentByTagName(item, 'pubDate')),
    duration: formatDuration(getTextContentByTagName(item, 'itunes:duration')),
    description: getTextContentByTagName(item, 'description'),
    audioUrl: (item as Element).querySelector('enclosure')?.getAttribute('url'),
  }));
  return episodes as Episode[];
}