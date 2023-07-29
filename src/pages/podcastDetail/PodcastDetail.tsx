import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, dispatch } from "../../store";
import { fetchPodcastDetail } from "../../store/thunks";
import PodcastCard from "../../components/podcastCard";
import EpisodeList from "../../components/episodeList";

import styles from "./PodcastDetail.module.css";
import { AnyAction } from "@reduxjs/toolkit";

const PodcastDetail = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const { podcastDetail } = useSelector((state: RootState) => state.podcastDetail);
  const { loading } = useSelector((state: any) => state.global);

  useEffect(() => {
    if (!podcastId) return;
    dispatch(fetchPodcastDetail(podcastId)).then((res: AnyAction) => {
      if (res.error) { // Error de CORS 
        navigate("/");
      }
    });
  }, [podcastId]);

  if (!podcastDetail || !podcastId || loading) return null;

  const { image, title, author, summary } = podcastDetail;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <PodcastCard id={podcastId} image={image} title={title} author={author} summary={summary} />
      </div>
      <div>
        <EpisodeList podcastId={podcastId} episodes={podcastDetail.episodes} />
      </div>
    </div>
  );
};

export default PodcastDetail;
