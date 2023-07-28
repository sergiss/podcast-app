import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RootState, dispatch } from "../../store";
import { fetchEpisodeDetail } from '../../store/thunks';
import { useSelector } from 'react-redux';

import styles from './EpisodeDetail.module.css'

const EpisodeDetail = () => {

    const { podcastId, episodeId } = useParams();

    const { selectedEpisode } = useSelector((state: RootState) => state.podcastDetail );

    useEffect(() => {
        if (!podcastId || !episodeId) return;
        dispatch(fetchEpisodeDetail({ podcastId, episodeId }));
    }, [])

    return (
        <div>
            <h1>EpisodeDetail</h1>
            <p>Podcast ID: {podcastId}</p>
            <p>Episode ID: {episodeId}</p>

            <div>
                <h2>Episode Detail</h2>
                <p>{selectedEpisode?.title}</p>
                <p>{selectedEpisode?.pubDate}</p>
                <p>{selectedEpisode?.duration}</p>
                <p>{selectedEpisode?.description}</p>
                <p>{selectedEpisode?.audioUrl}</p>
                <audio src={selectedEpisode?.audioUrl} controls />
            </div>
        </div>
    )
}

export default EpisodeDetail