import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { RootState, dispatch } from "../../store";
import { fetchEpisodeDetail } from "../../store/thunks";
import { useSelector } from "react-redux";
import PodcastCard from "../../components/podcastCard";
import Episode from "../../components/episode";

import styles from "./EpisodeDetail.module.css";

const EpisodeDetail = () => {
  const { podcastId, episodeId } = useParams();
  const { selectedEpisode, podcastDetail } = useSelector(
    (state: RootState) => state.podcastDetail
  );

  const { loading } = useSelector((state: any) => state.global);

  useEffect(() => {
    if (!podcastId || !episodeId) return;
    dispatch(fetchEpisodeDetail({ podcastId, episodeId }));
  }, [podcastId, episodeId]);

  if (!podcastDetail || !selectedEpisode || !podcastId || loading) return null;

  const { image, title, author, summary } = podcastDetail;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <PodcastCard
          id={podcastId}
          image={image}
          title={title}
          author={author}
          summary={summary}
        />
      </div>
      <div>
        <Episode episode={selectedEpisode} />
      </div>
    </div>
  );
};

export default EpisodeDetail;
