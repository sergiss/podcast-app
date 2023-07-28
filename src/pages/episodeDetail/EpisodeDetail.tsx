import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RootState, dispatch } from "../../store";
import { fetchEpisodeDetail } from '../../store/thunks';
import { useSelector } from 'react-redux';
import PodcastCard from '../../components/podcastCard';
import Episode from '../../components/episode';

import styles from './EpisodeDetail.module.css'

const EpisodeDetail = () => {

    const { podcastId, episodeId } = useParams();
    const { selectedEpisode, podcastDetail } = useSelector((state: RootState) => state.podcastDetail);

    const { loading } = useSelector((state: any) => state.global);

    useEffect(() => {
        if (!podcastId || !episodeId) return;
        dispatch(fetchEpisodeDetail({ podcastId, episodeId }));
    }, [podcastId, episodeId]);

    if (!podcastDetail || !selectedEpisode || loading) return null;

    const { image, title, author, summary } = podcastDetail;

    return (
        <div className={styles.container}>
            <PodcastCard image={image} title={title} author={author} summary={summary} />
            <Episode episode={selectedEpisode} />
        </div>
    )
}

export default EpisodeDetail