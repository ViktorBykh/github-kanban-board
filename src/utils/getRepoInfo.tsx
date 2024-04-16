import { formatTitleCase } from "./formatTitleCase";

export function getRepoInfo(repoUrl: string): JSX.Element {
  const [owner, repo] = repoUrl.split("/").slice(3, 5);
  const formattedOwner = formatTitleCase(owner);
  const formattedRepo = formatTitleCase(repo);

  return (
    <div>
      <a
        className="
          link-opacity-50-hover 
          link-underline 
          link-underline-opacity-0
        "
        href={`https://github.com/${owner}`}
      >
        {formattedOwner}
      </a>
      &nbsp;&gt;&nbsp;
      <a
        className="
          link-opacity-50-hover 
          link-underline 
          link-underline-opacity-0
        "
        href={`https://github.com/${owner}/${repo}`}
      >
        {formattedRepo}
      </a>
    </div>
  );
}
