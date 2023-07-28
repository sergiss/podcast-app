export interface Podcast {
    id: string;
    title: string;
    author: string;
    summary: string;
    image: string;
}

export interface PodcastListState {
    podcasts: Podcast[];
}

export interface Episode {
    id: string;
    title: string;
    pubDate: string;
    duration: string;
    description: string;
    audioUrl: string;
}

export interface PodcastDetail extends Podcast {
    episodes: Episode[];
}

export interface PodcastDetailState {
    podcastDetail: PodcastDetail | null;
}