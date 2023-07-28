export interface Podcast {
    id: string;
}

export interface PodcastListState {
    podcasts: Podcast[];
}

export interface Episode {
    id: string;
}

export interface PodcastDetail extends Podcast {
    episodes: Episode[];
}

export interface PodcastDetailState {
    podcastDetail: PodcastDetail | null;
}