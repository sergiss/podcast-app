import { useState } from "react";
import { Podcast } from "../../store/types";

const usePodcastFilter = (podcasts: Podcast[]) => {
  const [searchFilter, setSearchFilter] = useState("");

  const includes = (a: string, b: string) =>
    a?.toLowerCase().includes(b?.toLowerCase());

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      includes(podcast.title, searchFilter) ||
      includes(podcast.author, searchFilter)
  );

  return { searchFilter, setSearchFilter, filteredPodcasts };
};

export default usePodcastFilter;
