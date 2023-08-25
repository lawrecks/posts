export interface Comment {
  id: number;
  post_id: number;
  userId: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}
