import { Reorder } from "framer-motion";
import { IssueType } from "../types/IssueType";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type Props = {
  issue: IssueType;
  dragStartHandler: (issue: IssueType) => void;
};

export const Issue: React.FC<Props> = ({ issue, dragStartHandler }) => {
  
  return (
    <Reorder.Item className="reorder-item" key={issue.id} value={issue}>
      <div className="issue border p-3 rounded">
        <div
          className="issue-title mb-3"
          draggable={true}
          onDragStart={() => dragStartHandler(issue)}
        >
          {issue.title}
        </div>
        <div className="row">
          <div className="mb-1">
            <span>#{issue.number} </span>
            <span> opened {formatTimeAgo(issue.created_at)}</span>
          </div>
          <div>
            {issue.user && <span>{issue.user.login}</span>}
            <span> | Comments: {issue.comments}</span>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
};
