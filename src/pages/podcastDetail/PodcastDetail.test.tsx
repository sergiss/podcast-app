import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GlobalState, PodcastDetailState } from "../../store/types";
import PodcastDetail from "./PodcastDetail";

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
  }),
}));

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn().mockResolvedValueOnce({}),
  useSelector: (callback: (state: object) => void) => callback(mockState),
}));

jest.mock("../../store/thunks", () => ({
  fetchPodcastDetail: jest.fn().mockReturnValue({
    fulfilled: jest.fn(),
    rejected: jest.fn(),
    pending: jest.fn(),
  }),
}));

describe("<PodcastDetail />", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PodcastDetail />
      </BrowserRouter>
    );
  });

  it("renders PodcastDetail", () => {
    expect(screen.getByText("episodeTitleTest1")).toBeInTheDocument();
  });

  it("should display the correct number of episodes in the PodcastDetail component", async () => {
    // Episodes label
    expect(screen.getByText("Episodes: 2")).toBeInTheDocument();
  });

  it("should render 2 episodes in the EpisodeList component", async () => {
    // Table rows
    const rows = screen.getAllByRole("row");
    expect(rows.length - 1).toEqual(2);
  });
});
