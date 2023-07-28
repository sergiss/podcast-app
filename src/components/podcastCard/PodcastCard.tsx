import React from 'react'
import styles from './PodcastCard.module.css';

interface PodcastCardProps {
    image: string;
    title: string;
    author: string;
    summary: string;
}

const PodcastCard = ({ image, title, author, summary}: PodcastCardProps) => {
  return (
    <div className={styles.container}>
        <img className={styles.image} src={image} alt={title} />
        <h2>{title}</h2>
        <h3>by {author}</h3>
        <h4>Description:</h4>
        <p>{summary}</p>
    </div>
  )
}

export default PodcastCard