export default {
  createComment: `
    INSERT INTO comments (
      post_id,
      user_id,
      content
    )
    VALUES ($1, $2, $3)
    RETURNING id, post_id, user_id, content, created_at, updated_at
  `,
};
