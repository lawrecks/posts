export interface PostCreateDto {
  user_id: number;
  title: string;
  description?: string;
  content: string;
}