import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PodcastList from "./PodcastList";

const mockState = {
  global: {
    loading: false,
  },
  podcastList: {
    podcasts: [
      {
        id: "podcast1",
        title: "titleTest1",
        author: 'authorTest1',
        summary: 'summaryTest1',
        image: 'imageTest1',
      },
      {
        id: "podcast2",
        title: "titleTest2",
        author: 'authorTest2',
        summary: 'summaryTest2',
        image: 'imageTest2',
      },
    ],
  },
};

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn().mockResolvedValueOnce({}),
  useSelector: (callback: (state: object) => void) => callback(mockState),
}));

jest.mock("../../store/thunks", () => ({
  fetchTopPodcasts: jest.fn().mockReturnValue({
    fulfilled: jest.fn(),
    rejected: jest.fn(),
    pending: jest.fn(),
  }),
}));

describe("<PodcastList />", () => {
  let searchInput: HTMLElement;
  beforeEach(() => {
    render(
      <BrowserRouter>
        <PodcastList />
      </BrowserRouter>
    );
    searchInput = screen.getByPlaceholderText("Filter podcasts...");
  });

  it("renders PodcastList", () => {
    expect(searchInput).toBeInTheDocument();
  });

  it("filters podcast by title", async () => {
    fireEvent.change(searchInput, { target: { value: "titleTest1" } });
    const title = await screen.findByRole("heading", { name: /titleTest1/i });
    expect(title).toBeInTheDocument();
  });

  it("filters podcast by author", async () => {
    fireEvent.change(searchInput, { target: { value: "authorTest2" } });
    const author = await screen.findByText(/authorTest2/i);
    expect(author).toBeInTheDocument();
  });
});
