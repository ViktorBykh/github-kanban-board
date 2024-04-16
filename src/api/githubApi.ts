import axios from "axios";
import { IssueType } from "../types/IssueType";

const GITHUB_API_BASE_URL = "https://api.github.com";

export function fetchIssues(repoUrl: string): Promise<IssueType[]> {
  const urlParts = repoUrl.split("/");
  const owner = urlParts[3];
  const repoName = urlParts[4];
  const apiUrl = `${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}/issues`;

  return axios.get(apiUrl).then((response) => response.data);
}

export function fetchRepoStars(repoUrl: string): Promise<number> {
  const urlParts = repoUrl.split("/");
  const owner = urlParts[3];
  const repoName = urlParts[4];
  const apiUrl = `${GITHUB_API_BASE_URL}/repos/${owner}/${repoName}`;

  return axios.get(apiUrl).then((response) => response.data.stargazers_count);
}


