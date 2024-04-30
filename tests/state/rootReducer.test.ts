import rootReducer, { RootState } from "../../src/state/rootReducer";

describe("rootReducer", () => {
  it("returns the initial state", () => {
    const initialState = rootReducer(undefined, {} as any);
    expect(initialState).toEqual({
      issues: {
        issues: [],
        repoUrl: "",
      },
    });
  });

  it("handles issuesReducer correctly", () => {
    const state: RootState = {
      issues: {
        issues: [
          {
            id: 1,
            title: "Issue 1",
            number: 1,
            url: "",
            created_at: "",
            comments: 0,
            user: { login: "" },
          },
        ],
        repoUrl: "https://github.com/example/repo",
      },
    };

    const action = {
      type: "issues/setIssues",
      payload: [
        {
          id: 2,
          title: "Issue 2",
          number: 2,
          url: "",
          created_at: "",
          comments: 0,
          user: { login: "" },
        },
      ],
    };
    const newState = rootReducer(state, action);

    expect(newState).toEqual({
      issues: {
        issues: [
          {
            id: 2,
            title: "Issue 2",
            number: 2,
            url: "",
            created_at: "",
            comments: 0,
            user: { login: "" },
          },
        ],
        repoUrl: "https://github.com/example/repo",
      },
    });
  });
});
