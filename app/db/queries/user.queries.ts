export default {
  createUser: `
    INSERT INTO users(
      first_name,
      last_name,
      email,
      password
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id, first_name, last_name, email, created_at, updated_at
  `,

  findByEmail: `
    SELECT * FROM users
    WHERE users.email = $1
  `,

  findById: `
    SELECT * FROM users
    WHERE users.id = $1
  `,

  findAll: `
    SELECT
    id,
    first_name,
    last_name,
    email,
    created_at,
    updated_at
    FROM users`,

  getTopThreeUsers: `
    WITH RankedUsers AS (
      SELECT u.id AS user_id, u.first_name, u.last_name,
            ROW_NUMBER() OVER (ORDER BY COUNT(p.id) DESC) AS user_rank
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      GROUP BY u.id
    ),
    LatestPosts AS (
      SELECT p.user_id, MAX(p.created_at) AS latest_post_date
        FROM posts p
        GROUP BY p.user_id
    ),
    LatestComments AS (
      SELECT c.user_id, MAX(c.created_at) AS latest_comment_date
        FROM comments c
        GROUP BY c.user_id
    )
    SELECT ru.user_id, ru.first_name, ru.last_name, p.title AS latest_post_title, c.content AS latest_comment_content
    FROM RankedUsers ru
    LEFT JOIN LatestPosts ON ru.user_id = LatestPosts.user_id
    LEFT JOIN posts p ON LatestPosts.user_id = p.user_id AND LatestPosts.latest_post_date = p.created_at
    LEFT JOIN LatestComments ON ru.user_id = LatestComments.user_id
    LEFT JOIN comments c ON LatestComments.user_id = c.user_id AND LatestComments.latest_comment_date = c.created_at
    WHERE ru.user_rank <= 3
    ORDER BY ru.user_rank ASC`,
};
