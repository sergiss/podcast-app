import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import PodcastCard from './PodcastCard';

test('renders PodcastCard correctly', () => {
  const mockPodcast = {
    id: '1',
    image: 'https://example.com/image.jpg',
    title: 'Test Podcast',
    author: 'Test Author',
    summary: 'This is a test podcast.',
  };

  render(
    <Router>
      <PodcastCard {...mockPodcast} />
    </Router>
  );

  expect(screen.getByAltText(mockPodcast.title)).toBeInTheDocument();
  expect(screen.getByText(mockPodcast.title)).toBeInTheDocument();
  expect(screen.getByText(`by ${mockPodcast.author}`)).toBeInTheDocument();
  expect(screen.getByText(mockPodcast.summary)).toBeInTheDocument();
});