import { configureStore } from "@reduxjs/toolkit";
import rootReducer, {
  setIssues,
  setRepoUrl,
} from "../../src/state/issuesSlice";
import { RootState } from "../../src/state/store";

const mockIssues = [
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

const mockRepoUrl = "https://github.com/owner/repo";

describe("issuesSlice reducer", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: rootReducer,
    });
  });

  it("should set issues", () => {
    store.dispatch(setIssues(mockIssues));

    const state: RootState = {
      issues: {
        issues: mockIssues,
        repoUrl: "",
      }
    };

    expect(state.issues.issues).toEqual(mockIssues);
  });

  it("should set repo URL", () => {
    store.dispatch(setRepoUrl(mockRepoUrl));

    const state: RootState = {
      issues: {
        issues: [],
        repoUrl: mockRepoUrl,
      }
    };

    expect(state.issues.repoUrl).toEqual(mockRepoUrl);
  });
});
