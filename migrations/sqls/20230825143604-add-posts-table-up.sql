CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS "idx_post_id" ON posts (id);

CREATE INDEX IF NOT EXISTS "idx_post_user_id" ON posts (user_id);

CREATE INDEX IF NOT EXISTS "idx_post_created_at" ON posts (created_at);
