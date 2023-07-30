import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, dispatch } from "../../store";
import { fetchTopPodcasts } from "../../store/thunks";
import usePodcastFilter from "../../hooks/usePodcastFilter";

import styles from "./PodcastList.module.css";

const PodcastList = () => {
  const { podcasts } = useSelector((state: RootState) => state.podcastList);
  const { filteredPodcasts, searchFilter, setSearchFilter } =
    usePodcastFilter(podcasts);

  useEffect(() => {
    dispatch(fetchTopPodcasts());
  }, []);

  return (
    <div className={styles.container}>
      {/* Podcast Filter */}
      <div className={styles.filter}>
        <span>{filteredPodcasts.length}</span>
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter podcasts..."
        />
      </div>
      {/* Podcast List */}
      <div className={styles.list}>
        {filteredPodcasts.map((podcast: any) => (
          <Link
            className={styles.podcast}
            to={`/podcast/${encodeURIComponent(podcast.id)}`}
            key={podcast.id}
          >
            <img src={podcast.image} alt={podcast.title} />
            <h3>{podcast.title}</h3>
            <p>{podcast.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
