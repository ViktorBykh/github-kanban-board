import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { App } from "../src/App";
import { store } from "../src/state/store";

const mockIssue = [
  {
    id: 1,
    url: "https://api.github.com/repos/owner/repo/issues/1",
    title: "First Issue",
    number: 1,
    created_at: "2024-04-30T10:00:00Z",
    comments: 3,
    user: {
      login: "user1",
    },
  },
];

const mockStarsCount = 1000;
jest.mock("../src/api/githubApi", () => ({
  fetchIssues: jest.fn(() => Promise.resolve(mockIssue)),
  fetchRepoStars: jest.fn(() => Promise.resolve(mockStarsCount)),
}));

describe("App", () => {
  it("should render input field and load button", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText("Enter repository URL")
    ).toBeInTheDocument();
    expect(screen.getByText("Load issues")).toBeInTheDocument();
  });

  it("should change input value when typing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter repository URL");
    fireEvent.change(input, {
      target: { value: "https://github.com/owner/repo" },
    });

    expect(input).toHaveValue("https://github.com/owner/repo");
  });

  it("should show error message for invalid URL", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter repository URL");
    const loadButton = screen.getByText("Load issues");

    fireEvent.change(input, { target: { value: "invalid-url" } });
    fireEvent.click(loadButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid GitHub repository URL. Please check your URL and try again."
        )
      ).toBeInTheDocument();
    });
  });

  it("should load issues when valid URL is entered", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter repository URL");
    const loadButton = screen.getByText("Load issues");

    fireEvent.change(input, {
      target: { value: "https://github.com/owner/repo" },
    });
    fireEvent.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText("First Issue")).toBeInTheDocument();
    });
  });

  it("should display repository information and star count", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Enter repository URL");
    const loadButton = screen.getByText("Load issues");

    fireEvent.change(input, {
      target: { value: "https://github.com/owner/repo" },
    });
    fireEvent.click(loadButton);

    await waitFor(() => {
      expect(screen.getByText("Owner")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Repo")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("1 K stars")).toBeInTheDocument();
    });
  });
});
