import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchTopPodcasts } from "../../store/thunks";
import { clearPodcastDetail } from "../../store/slices";
import usePodcastFilter from "../../hooks/usePodcastFilter";
import { Podcast } from "../../store/types";

import styles from "./PodcastList.module.css";

const PodcastList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { podcasts } = useSelector((state: RootState) => state.podcastList);
  const { filteredPodcasts, searchFilter, setSearchFilter } =
    usePodcastFilter(podcasts);

  useEffect(() => {
    dispatch(clearPodcastDetail());
    dispatch(fetchTopPodcasts());
  }, [dispatch]);

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
        {filteredPodcasts.map((podcast: Podcast) => (
          <Link
            className={styles.podcast}
            to={`/podcast/${encodeURIComponent(podcast.id)}`}
            key={podcast.id}
            data-testid="podcast-item"
          >
            <div className={styles.wrapper}>
              <img src={podcast.image} alt={podcast.title} />
            </div>
            <h3>{podcast.title}</h3>
            <p>{podcast.author}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;
