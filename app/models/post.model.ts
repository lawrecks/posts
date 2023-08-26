export interface Post {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}
