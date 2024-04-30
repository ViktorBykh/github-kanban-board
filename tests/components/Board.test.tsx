import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { Board, initialBoards } from "../../src/components/Board";
import configureStore from "redux-mock-store";
import { IssueType } from "../../src/types/IssueType";

const DEFAULT_REPO = "https://github.com/owner/repo";

const mockStore = configureStore([]);

const mockIssues: IssueType[] = [
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
  {
    id: 2,
    url: "https://api.github.com/repos/owner/repo/issues/2",
    title: "Second Issue",
    number: 2,
    created_at: "2024-04-29T15:30:00Z",
    comments: 1,
    user: {
      login: "user2",
    },
  },
  {
    id: 3,
    url: "https://api.github.com/repos/owner/repo/issues/3",
    title: "Third Issue",
    number: 3,
    created_at: "2024-04-28T08:45:00Z",
    comments: 0,
    user: {
      login: "user3",
    },
  },
];

describe("Board Component", () => {
  const mockState = { issues: [], repoUrl: DEFAULT_REPO };

  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the board with issues", () => {
    const mockStateWithIssues = { ...mockState, issues: [...mockIssues] };

    render(
      <Provider store={mockStore({ issues: mockStateWithIssues })}>
        <Board />
      </Provider>
    );

    const boards = screen.getByTestId("boards");
    expect(boards).toBeInTheDocument();
  });

  it("renders with no issues", () => {
    render(
      <Provider store={mockStore({ issues: mockState })}>
        <Board />
      </Provider>
    );

    const noIssuesMessage = screen.getByTestId("no-issues");
    expect(noIssuesMessage).toBeInTheDocument();
  });

  it("updates state when repoUrl changes", () => {
    render(
      <Provider store={mockStore({ issues: mockState })}>
        <Board />
      </Provider>
    );

    expect(localStorage.getItem(mockState.repoUrl)).toBe(
      JSON.stringify(initialBoards)
    );

    const newRepoUrl = "https://github.com/new_owner/new_repo";
    const newMockState = { ...mockState, repoUrl: newRepoUrl };

    render(
      <Provider store={mockStore({ issues: newMockState })}>
        <Board />
      </Provider>
    );

    expect(localStorage.getItem(newRepoUrl)).toBe(
      JSON.stringify(initialBoards)
    );
  });

  it("updates local storage when repoUrl changes", () => {
    render(
      <Provider store={mockStore({ issues: mockState })}>
        <Board />
      </Provider>
    );

    expect(localStorage.getItem(DEFAULT_REPO)).toBe(
      JSON.stringify(initialBoards)
    );

    const newRepoUrl = "https://github.com/new_owner/new_repo";
    const mockStateWithNewRepo = {
      issues: mockIssues,
      repoUrl: newRepoUrl,
    };

    render(
      <Provider store={mockStore({ issues: mockStateWithNewRepo })}>
        <Board />
      </Provider>
    );

    const newBoards = initialBoards.map((prevBoard) =>
      prevBoard.title === "Todo"
        ? { ...prevBoard, issues: [...mockIssues] }
        : prevBoard
    );
    expect(localStorage.getItem(newRepoUrl)).toEqual(JSON.stringify(newBoards));
  });

  it("retrieves boards from local storage when repoUrl matches", () => {
    const storedBoards = JSON.stringify(initialBoards);
    localStorage.setItem(DEFAULT_REPO, storedBoards);

    const mockStateWithIssues = { ...mockState, issues: [...mockIssues] };

    render(
      <Provider store={mockStore({ issues: mockStateWithIssues })}>
        <Board />
      </Provider>
    );

    const allBoards = screen.getAllByTestId("board");
    expect(allBoards.length).toBe(initialBoards.length);
  });

  it("allows dragging and dropping issues between boards", () => {
    const mockStateWithIssues = { ...mockState, issues: [...mockIssues] };

    render(
      <Provider store={mockStore({ issues: mockStateWithIssues })}>
        <Board />
      </Provider>
    );

    const firstIssue = screen.getByText("First Issue");

    fireEvent.dragStart(firstIssue);

    const secondBoard = screen.getByText("In Progress");
    fireEvent.drop(secondBoard);

    const secondBoardIssues = screen.getByText("First Issue");
    expect(secondBoardIssues).toBeInTheDocument();
  });

  it("allows reordering issues within a board", () => {
    const mockStateWithIssues = { ...mockState, issues: [...mockIssues] };

    render(
      <Provider store={mockStore({ issues: mockStateWithIssues })}>
        <Board />
      </Provider>
    );

    const initialIssues = screen
      .getAllByText(/Issue/)
      .map((issue) => issue.textContent);

    const firstIssue = screen.getByText("First Issue");
    fireEvent.dragStart(firstIssue);
    fireEvent.dragOver(screen.getByText("Second Issue"));
    fireEvent.drop(screen.getByText("In Progress"));

    const reorderedIssues = screen
      .getAllByText(/Issue/)
      .map((issue) => issue.textContent);

    expect(initialIssues[0]).toBe("First Issue");
    expect(initialIssues[1]).toBe("Second Issue");

    expect(reorderedIssues[0]).toBe("Second Issue");
    expect(reorderedIssues[1]).toBe("Third Issue");
  });
});
