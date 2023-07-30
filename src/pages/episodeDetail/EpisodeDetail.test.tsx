import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EpisodeDetail from "./EpisodeDetail";
import { Episode, GlobalState, PodcastDetailState } from "../../store/types";

const mockState: {
  global: GlobalState;
  podcastDetail: PodcastDetailState;
} = {
  global: {
    loading: false,
  },
  podcastDetail: {
    podcastDetail: {
      id: "podcast1",
      title: "titleTest1",
      author: "authorTest1",
      summary: "summaryTest1",
      image: "imageTest1",
      episodes: [
        {
          id: "episode1",
          title: "episodeTitleTest1",
          pubDate: "04/01/2023",
          duration: "60:00",
          description: "episodeDescriptionTest1",
          audioUrl: "urlTest1",
        },
        {
          id: "episode2",
          title: "episodeTitleTest2",
          pubDate: "04/01/2023",
          duration: "60:00",
          description: "episodeDescriptionTest2",
          audioUrl: "urlTest2",
        },
      ],
    },
    selectedEpisode: null,
  },
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    podcastId: "podcast1",
    episodeId: "episode1",
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn().mockResolvedValueOnce({}),
  useSelector: (callback: any) => callback(mockState),
}));

jest.mock("../../store/thunks", () => ({
  fetchEpisodeDetail: jest.fn().mockReturnValue({
    fulfilled: jest.fn(),
    rejected: jest.fn(),
    pending: jest.fn(),
  }),
}));

describe("<EpisodeDetail />", () => {
  let episode: Episode;
  beforeEach(() => {
    // Simulate that the user has selected an episode
    episode = mockState.podcastDetail.podcastDetail?.episodes[1] as Episode;
    mockState.podcastDetail.selectedEpisode = episode;
    render(
      <BrowserRouter>
        <EpisodeDetail />
      </BrowserRouter>
    );
  });

  it("renders EpisodeDetail", () => {
    expect(screen.getByText(episode.title)).toBeInTheDocument();
  });

  it("displays the correct description", () => {
    expect(screen.getByText(episode.description)).toBeInTheDocument();
    const audioComponent = document.querySelector("audio");
    expect(audioComponent).toBeInTheDocument();
    expect(audioComponent?.getAttribute("src")).toBe(episode.audioUrl);
  });
});
