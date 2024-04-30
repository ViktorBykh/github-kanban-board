import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchIssues, fetchRepoStars } from "../../src/api/githubApi";

const mock = new MockAdapter(axios);

describe("fetchIssues", () => {
  it("fetches issues from GitHub API", () => {
    const mockIssues = [
      { id: 1, title: "Issue 1" },
      { id: 2, title: "Issue 2" },
    ];
    mock
      .onGet("https://api.github.com/repos/owner/repo/issues")
      .reply(200, mockIssues);

    return fetchIssues("https://github.com/owner/repo").then((issues) =>
      expect(issues).toEqual(mockIssues)
    );
  });
});

describe("fetchRepoStars", () => {
  it("fetches star count for a GitHub repository", () => {
    const mockStarCount = 100;
    mock
      .onGet("https://api.github.com/repos/owner/repo")
      .reply(200, { stargazers_count: mockStarCount });

    return fetchRepoStars("https://github.com/owner/repo").then((starCount) =>
      expect(starCount).toEqual(mockStarCount)
    );
  });
});
