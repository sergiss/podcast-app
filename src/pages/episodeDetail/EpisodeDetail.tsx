import React from 'react'

import styles from './EpisodeDetail.module.css'
import { useParams } from 'react-router-dom';

const EpisodeDetail = () => {
    const { podcastId, episodeId } = useParams();
    return (
        <div>
            <h1>EpisodeDetail</h1>
            <p>Podcast ID: {podcastId}</p>
            <p>Episode ID: {episodeId}</p>
        </div>
    )
}

export default EpisodeDetail