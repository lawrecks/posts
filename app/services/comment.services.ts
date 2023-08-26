import db from "../db";
import commentQueries from "../db/queries/comment.queries";
import { CommentCreateDto } from "../utils/dto/comment.dto";

export const createComment = async (data: CommentCreateDto): Promise<Comment> => {
  const { postId, userId, content } = data;
  const payload = [postId, userId, content];

  return db.one<Comment>(commentQueries.createComment, payload);
};