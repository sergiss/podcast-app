import React from "react";
import { Episode } from "../../store/types";

import styles from "./EpisodeList.module.css";
import { useNavigate } from "react-router-dom";

interface EpisodeListProps {
  podcastId: string;
  episodes: Episode[];
}

const EpisodeList = ({ podcastId, episodes }: EpisodeListProps) => {
  const navigate = useNavigate();
  const episodeCount = episodes?.length || 0;

  const handleClick = (episode: Episode) => {
    navigate(
      `/podcast/${encodeURIComponent(podcastId)}/episode/${encodeURIComponent(
        episode.id
      )}`
    );
  };

  return (
    <div className={styles.container}>
      <div className="border">
        <h2 className={styles.episodeCount}>Episodes: {episodeCount}</h2>
      </div>
      <div className={`border ${styles.wrapper}`}>
        <table className={styles.episodes}>
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((episode: any) => (
              <tr
                className={styles.episode}
                key={episode.id}
                onClick={(e) => handleClick(episode)}
              >
                <td className={styles.blueText}>{episode.title}</td>
                <td>{episode.pubDate}</td>
                <td>{episode.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EpisodeList;
