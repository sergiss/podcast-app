import React from "react";
import { Link } from "react-router-dom";
import ShowMore from "../showMore";
import Separator from "../separator";
import { Podcast } from "../../store/types";

import styles from "./PodcastCard.module.css";

const PodcastCard = ({
  id,
  image,
  title,
  author,
  summary,
}: Podcast) => {
  return (
    <div className={`border ${styles.container}`}>
      <Link className={styles.link} to={`/podcast/${id}`}>
        <img className={styles.image} src={image} alt={title} />
      </Link>
      <Separator />
      <Link className={styles.link} to={`/podcast/${id}`}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.author}>by {author}</p>
      </Link>
      <Separator />
      <p className={styles.description}>Description:</p>
      <ShowMore maxHeight={"250px"}>
        <p className={styles.descriptionText}>{summary}</p>
      </ShowMore>
    </div>
  );
};

export default PodcastCard;
