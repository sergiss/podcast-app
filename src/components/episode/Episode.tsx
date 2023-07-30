import React from "react";
import * as Types from "../../store/types";
import Separator from "../separator";

import styles from "./Episode.module.css";
import ShowMore from '../showMore/ShowMore';

interface EpisodeProps {
  episode: Types.Episode;
}

const Episode = ({ episode }: EpisodeProps) => {
  return (
    <div className={`border ${styles.container}`}>
      <h2 className={styles.title}>{episode?.title}</h2>
      <ShowMore maxHeight={"400px"} className={styles.showMore}>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: episode?.description || "" }}
        ></div>
      </ShowMore>
      <Separator />
      <audio className={styles.audio} src={episode?.audioUrl} controls autoPlay />
    </div>
  );
};

export default Episode;
