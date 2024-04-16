export interface IssueType {
  id: number;
  url: string;
  title: string;
  number: number;
  created_at: string;
  comments: number;
  user: {
    login: string;
  };
}
