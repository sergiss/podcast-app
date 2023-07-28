import React from 'react'
import * as Types from '../../store/types'

import styles from './Episode.module.css'

interface EpisodeProps {
    episode: Types.Episode;
}

const Episode = ({ episode }: EpisodeProps) => {
    return (
        <div>
            <h2>{episode?.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: episode?.description || "" }}></div>
            <audio src={episode?.audioUrl} controls />
        </div>
    )
}

export default Episode