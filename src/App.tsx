import React from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Layout from './pages/layout';
import PodcastList from './pages/podcastList';
import PodcastDetail from './pages/podcastDetail';
import EpisodeDetail from './pages/episodeDetail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<PodcastList />}
          />
          <Route
            path="/podcast/:podcastId"
            element={<PodcastDetail />}
          />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetail />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App