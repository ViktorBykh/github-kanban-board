import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Reorder } from "framer-motion";
import { formatTimeAgo } from "../../src/utils/formatTimeAgo";
import { Issue } from "../../src/components/Issue";

const mockIssue = {
  id: 1,
  url: "https://api.github.com/repos/owner/repo/issues/1",
  title: "Test Issue",
  number: 1,
  created_at: "2024-04-30T10:00:00Z",
  comments: 3,
  user: {
    login: "user1",
  },
};

describe("Issue Component", () => {
  it("renders issue details correctly", () => {
    render(
      <Reorder.Group values={[mockIssue]} onReorder={() => {}}>
        <Issue issue={mockIssue} dragStartHandler={() => {}} />
      </Reorder.Group>
    );

    const issueTitle = screen.getByText(mockIssue.title);
    const issueNumber = screen.getByText(`#${mockIssue.number}`);
    const issueCreatedAt = screen.getByText(
      `opened ${formatTimeAgo(mockIssue.created_at)}`
    );
    const issueUserLogin = screen.getByText(mockIssue.user.login);
    const issueComments = screen.getByText(
      new RegExp(`Comments:\\s*${mockIssue.comments}`)
    );

    expect(issueTitle).toBeInTheDocument();
    expect(issueNumber).toBeInTheDocument();
    expect(issueCreatedAt).toBeInTheDocument();
    expect(issueUserLogin).toBeInTheDocument();
    expect(issueComments).toBeInTheDocument();
  });

  it("calls dragStartHandler with the correct issue when dragged", () => {
    const mockDragStartHandler = jest.fn();

    render(
      <Reorder.Group values={[mockIssue]} onReorder={() => {}}>
        <Issue issue={mockIssue} dragStartHandler={mockDragStartHandler} />
      </Reorder.Group>
    );

    const issueTitle = screen.getByText(mockIssue.title);

    fireEvent.dragStart(issueTitle);

    expect(mockDragStartHandler).toHaveBeenCalledWith(mockIssue);
  });
});
