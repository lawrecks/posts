CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE INDEX IF NOT EXISTS "idx_comment_id" ON comments (id);

CREATE INDEX IF NOT EXISTS "idx_comment_user_id" ON comments (user_id);

CREATE INDEX IF NOT EXISTS "idx_comment_post_id" ON comments (post_id);

CREATE INDEX IF NOT EXISTS "idx_comment_created_at" ON comments (created_at);