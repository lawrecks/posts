import db from '../db';
import postQueries from '../db/queries/post.queries';
import { Post } from '../models/post.model';
import { PostCreateDto } from '../utils/dto/post.dto';

export const createPost = async (data: PostCreateDto): Promise<Post> => {
  const { user_id: userId, title, description, content } = data;
  const payload = [userId, title, description, content];
  const [post] = await db.any<Post>(postQueries.createPost, payload);

  return post;
};
