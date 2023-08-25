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
};
