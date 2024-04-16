import { createSlice } from "@reduxjs/toolkit";
import { IssueType } from "../types/IssueType";

interface IssuesState {
  issues: IssueType[];
  repoUrl: string;
}

const initialState: IssuesState = {
  issues: [],
  repoUrl: "",
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    setIssues(state, action) {
      state.issues = action.payload;
    },
    setRepoUrl(state, action) {
      state.repoUrl = action.payload;
    },
  },
});

export const { setIssues, setRepoUrl } = issuesSlice.actions;
export default issuesSlice.reducer;
