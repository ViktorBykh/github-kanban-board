import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./state/store";
import { setRepoUrl, setIssues } from "./state/issuesSlice";
import { fetchIssues, fetchRepoStars } from "./api/githubApi";
import { formatStarCount } from "./utils/formatStarCount";
import { formatValidUrl } from "./utils/formatValidUrl";
import { Board } from "./components/Board";
import { getRepoInfo } from "./utils/getRepoInfo";

const STAR_LINK =
  "https://github.githubassets.com/images/icons/emoji/unicode/2b50.png?v8";

export const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { repoUrl } = useSelector((state: RootState) => state.issues);
  const [loading, setLoading] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(0);
  const [repoInfo, setRepoInfo] = useState<JSX.Element | null>(null);
  const [error, setError] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);


  const handleLoad = () => {
    setIsTyping(true);
    setLoading(true);
    setError("");

    if (!formatValidUrl(repoUrl)) {
      setLoading(false);
      setIsTyping(false);
      return setError(
        "Invalid GitHub repository URL. Please check your URL and try again."
      );
    }

    fetchIssues(repoUrl)
      .then((issues) => dispatch(setIssues(issues)))
      .catch(() =>
        setError("Failed to load issues. Please check your URL and try again.")
      )
      .finally(() => setLoading(false));

    fetchRepoStars(repoUrl)
      .then((count) => {
        setStarsCount(count);
        setRepoInfo(getRepoInfo(repoUrl));
      })
      .finally(() => setLoading(false));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    setIsTyping(false);
    dispatch(setRepoUrl(query));
  };

  return (
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter repository URL"
          value={repoUrl}
          onChange={handleQueryChange}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLoad}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load issues"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {!error && !loading && (
        <div>
          {isTyping && (
            <div>
              <div className="repo-info text-primary">
                {repoInfo}
                &nbsp;&nbsp;
                {starsCount !== 0 && (
                  <div className="star-description text-secondary">
                    <img
                      src={STAR_LINK}
                      alt="star"
                      className="star-image img-thumbnail"
                    />
                    &nbsp;
                    {formatStarCount(starsCount)} stars
                  </div>
                )}
              </div>

              <Board />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
