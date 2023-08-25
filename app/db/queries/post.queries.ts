export default {
  createPost: `
    INSERT INTO posts (
      user_id,
      title,
      description,
      content
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id, user_id, title, description, content, created_at, updated_at
  `,

  findAll: `
    SELECT 
    id,
    user_id,
    title,
    description,
    content
    created_at,
    updated_at
    FROM posts
    WHERE user_id = $1`,
};
