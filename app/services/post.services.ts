import db from '../db';
import postQueries from '../db/queries/post.queries';
import { Post } from '../models/post.model';
import { PostCreateDto } from '../utils/dto/post.dto';

export const createPost = async (data: PostCreateDto): Promise<Post> => {
  const { user_id: userId, title, description, content } = data;
  const payload = [userId, title, description, content];

  return db.query<Post>(postQueries.createPost, payload);
};

export const getAllPosts = async (userId: string): Promise<Post[]> => {
  return db.many<Post>(postQueries.findAll, userId);
};
