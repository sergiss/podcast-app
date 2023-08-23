import React from 'react'
import './global.css';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import Layout from './pages/layout';
import PodcastList from './pages/podcastList';
import PodcastDetail from './pages/podcastDetail';
import EpisodeDetail from './pages/episodeDetail';

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App