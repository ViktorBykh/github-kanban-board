import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getRepoInfo } from "../../src/utils/getRepoInfo";

describe("getRepoInfo", () => {
  it("should render the formatted owner and repo links", () => {
    const repoUrl = "https://github.com/owner/repo";
    render(getRepoInfo(repoUrl));

    const ownerLink = screen.getByText("Owner");
    const repoLink = screen.getByText("Repo");

    expect(ownerLink).toHaveAttribute("href", "https://github.com/owner");
    expect(repoLink).toHaveAttribute("href", "https://github.com/owner/repo");
  });

  it("should render the formatted owner and repo links in title case", () => {
    const repoUrl = "https://github.com/OwnerTitleCase/RepoTitleCase";
    render(getRepoInfo(repoUrl));

    const ownerLink = screen.getByText("OwnerTitleCase");
    const repoLink = screen.getByText("RepoTitleCase");

    expect(ownerLink).toHaveAttribute(
      "href",
      "https://github.com/OwnerTitleCase"
    );
    expect(repoLink).toHaveAttribute(
      "href",
      "https://github.com/OwnerTitleCase/RepoTitleCase"
    );
  });
});
