import { store, RootState } from "../../src/state/store";

describe("store", () => {
  it("should have the correct initial state", () => {
    const initialState = store.getState();
    expect(initialState.issues).toEqual({
      issues: [],
      repoUrl: "",
    });
  });

  it("should dispatch actions correctly", () => {
    const action = {
      type: "issues/setIssues",
      payload: [
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
    };
    store.dispatch(action);

    const newState: RootState = store.getState();
    expect(newState.issues).toEqual({
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
      repoUrl: "",
    });
  });
});
