import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "./";

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn().mockResolvedValueOnce({}),
  useSelector: (callback: (state: object) => void) => callback(mockState),
}));

let mockState = {
  global: {
    loading: false,
  },
};

describe("Header Component", () => {
  it("displays Podcaster title and Loading component when loading", () => {
    mockState = {
      global: {
        loading: true,
      },
    };

    const { getByText, queryByTestId } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText("Podcaster")).toBeInTheDocument();

    expect(queryByTestId("loading-component")).toBeInTheDocument();
  });

  it("displays Podcaster title and does not display Loading component when not loading", () => {
    mockState = {
      global: {
        loading: false,
      },
    };

    const { getByText, queryByTestId } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText("Podcaster")).toBeInTheDocument();

    expect(queryByTestId("loading-component")).not.toBeInTheDocument();
  });
});
