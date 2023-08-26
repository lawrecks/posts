export interface PostCreateDto {
  userId: number;
  title: string;
  description?: string;
  content: string;
}