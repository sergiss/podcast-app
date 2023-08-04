import React from 'react';
import { render } from '@testing-library/react';
import Episode from './Episode';
import * as Types from '../../store/types';

const episode: Types.Episode = {
  id: '1',
  title: 'Episode 1',
  description: '<p>Description</p>',
  pubDate: '2023-08-01',
  duration: '30:00',
  audioUrl: 'https://example.com/audio.mp3',
};

describe('Episode component', () => {
  it('renders title, description, and audio', () => {
    const { getByText, container } = render(<Episode {...episode} />);

    expect(getByText('Episode 1')).toBeInTheDocument();

    const descriptionElement = getByText('Description');
    expect(descriptionElement.innerHTML).toBe('Description');

    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement?.getAttribute('src')).toBe('https://example.com/audio.mp3');
  });
});