import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchEpisodeDetail } from "../../store/thunks/";
import { clearSelectedEpisode } from "../../store/slices";
import PodcastCard from "../../components/podcastCard";
import Episode from "../../components/episode";

import styles from "./EpisodeDetail.module.css";

const EpisodeDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const { podcastId, episodeId } = useParams();
  const { selectedEpisode, podcastDetail } = useSelector(
    (state: RootState) => state.podcastDetail
  );

  useEffect(() => {
    if (!podcastId || !episodeId) return;
    dispatch(fetchEpisodeDetail({ podcastId, episodeId }));
    return () => {
      // Clear selected episode
      dispatch(clearSelectedEpisode());
    }
  }, [dispatch, podcastId, episodeId]);

  if (!podcastDetail || !selectedEpisode || !podcastId) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <PodcastCard {...podcastDetail} />
      </div>
      <div className={styles.episode}>
        <Episode {...selectedEpisode} />
      </div>
    </div>
  );
};

export default EpisodeDetail;
