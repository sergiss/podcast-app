import React from 'react'
import { Episode } from '../../store/types';

import styles from './EpisodeList.module.css';
import { useNavigate } from 'react-router-dom';

interface EpisodeListProps {
    podcastId: string;
    episodes: Episode[];
}

const EpisodeList = ({ podcastId, episodes }: EpisodeListProps) => {
  const navigate = useNavigate();
  const episodeCount = episodes?.length || 0;

  const handleClick = (episode: Episode) => {
    navigate(`/podcast/${podcastId}/episode/${episode.id}`);
  }

  return (
    <div className={styles.container}>
      <h2>Episodes: {episodeCount}</h2>
      <table className={styles.episodes}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode: any) => (
            <tr className={styles.episode} key={episode.id} onClick={(e) => handleClick(episode)}>
              <td>{episode.title}</td>
              <td>{episode.pubDate}</td>
              <td>{episode.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EpisodeList