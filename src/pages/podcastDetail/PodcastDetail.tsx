import React from 'react'

import styles from './PodcastDetail.module.css'
import { useParams } from 'react-router-dom';

const PodcastDetail = () => {
    const { podcastId } = useParams();
    return (
        <div>
            <h1>PodcastDetail</h1>
            <p>Podcast ID: {podcastId}</p>
        </div>
    )
}

export default PodcastDetail