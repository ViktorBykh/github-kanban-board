import React, { useEffect, useState } from "react";
import { IssueType } from "../types/IssueType";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Issue } from "./Issue";
import { Reorder } from "framer-motion";

interface BoardType {
  id: number;
  title: string;
  issues: IssueType[];
}

export const initialBoards: BoardType[] = [
  { id: 1, title: "Todo", issues: [] },
  { id: 2, title: "In Progress", issues: [] },
  { id: 3, title: "Done", issues: [] },
];

export const Board: React.FC = () => {
  const { issues, repoUrl } = useSelector((state: RootState) => state.issues);
  const [boards, setBoards] = useState<BoardType[]>(initialBoards);
  const [currentBoard, setCurrentBoard] = useState<BoardType>();
  const [currentIssue, setCurrentIssue] = useState<IssueType>();

  useEffect(() => {
    const storedBoards = localStorage.getItem(repoUrl);
    if (storedBoards) {
      setBoards(JSON.parse(storedBoards));
    } else {
      setBoards(initialBoards);
    }
  }, [repoUrl]);

  useEffect(() => {
    localStorage.setItem(repoUrl, JSON.stringify(boards));
  }, [boards, repoUrl]);

  useEffect(() => {
    const urlParts = repoUrl.split("/");
    const owner = urlParts[3];
    const repoName = urlParts[4];

    setBoards((prevBoards) => {
      const boardsEmpty = prevBoards.every(
        (board) => board.issues.length === 0
      );

      const isCurrentRepo = prevBoards.every((board) =>
        board.issues.every((issue) =>
          issue.url.includes(`api.github.com/repos/${owner}/${repoName}/issues`)
        )
      );

      if (boardsEmpty) {
        return prevBoards.map((board) => ({
          ...board,
          issues: board.title === "Todo" ? [...issues] : [],
        }));
      }

      if (!boardsEmpty && !isCurrentRepo) {
        return prevBoards.map((board) => ({
          ...board,
          issues: board.title === "Todo" ? [...issues] : [],
        }));
      }

      return prevBoards;
    });
  }, [issues, repoUrl]);

  function dragStartHandler(board: BoardType, issue: IssueType): void {
    setCurrentBoard(board);
    setCurrentIssue(issue);
  }

  function dropIssueHandler(board: BoardType): void {
    if (currentIssue && currentBoard) {
      board.issues.unshift(currentIssue);
      const currentIndex = currentBoard.issues.indexOf(currentIssue);
      currentBoard.issues.splice(currentIndex, 1);

      setBoards(
        boards.map((prevBoard) => {
          if (prevBoard.id === currentBoard.id) {
            return currentBoard;
          }
          if (prevBoard.id === board.id) {
            return board;
          }
          return prevBoard;
        })
      );
    }
  }

  function reorderHandler(boardId: number, newIssues: IssueType[]): void {
    setBoards(
      boards.map((prevBoard) => {
        if (prevBoard.id === boardId) {
          return { ...prevBoard, issues: newIssues };
        }
        return prevBoard;
      })
    );
  }

  if (issues.length === 0) {
    return (
      <div className="text-center" data-testid="no-issues">
        No issues available
      </div>
    );
  }

  return (
    <div
      className="
        row
        row-cols-1
        row-cols-md-3
        "
      data-testid="boards"
    >
      {boards.map((board) => (
        <div
          key={board.id}
          onDragOver={(event) => event.preventDefault()}
          onDrop={() => dropIssueHandler(board)}
          data-testid="board"
        >
          <div
            className="
              card 
              border 
              border-primary 
              rounded-3 
              mb-3
              "
          >
            <div
              className="
                card-header
                bg-primary
                text-white
                d-flex
                justify-content-between
                align-items-center
                "
            >
              <span>{board.title}</span>
              <span className="badge bg-light text-primary">
                {board.issues?.length || 0}
              </span>
            </div>
            <Reorder.Group
              className="reorder-group"
              values={board.issues}
              onReorder={(issues) => reorderHandler(board.id, issues)}
              axis="y"
            >
              {board.issues.map((issue) => (
                <Issue
                  key={issue.number}
                  issue={issue}
                  dragStartHandler={() => dragStartHandler(board, issue)}
                />
              ))}
            </Reorder.Group>
          </div>
        </div>
      ))}
    </div>
  );
};
