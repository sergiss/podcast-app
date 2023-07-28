import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, dispatch } from "../../store";
import { fetchTopPodcasts } from "../../store/thunks";
import usePodcastFilter from "../../hooks/usePodcastFilter";

const PodcastList = () => {
  const { podcasts } = useSelector((state: RootState) => state.podcastList);
  const { filteredPodcasts, searchFilter, setSearchFilter } =
    usePodcastFilter(podcasts);

  useEffect(() => {
    dispatch(fetchTopPodcasts());
  }, []);

  return (
    <div>
      <h1>Test</h1>
      <input
        type="text"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Filter podcasts"
      />
      {filteredPodcasts.map((podcast: any) => (
        <Link to={`/podcast/${podcast.id}`} key={podcast.id}>
          <div key={podcast.id}>
            <h2>{podcast.title}</h2>
            <p>{podcast.author}</p>
            <img src={podcast.image} alt={podcast.title} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PodcastList;
