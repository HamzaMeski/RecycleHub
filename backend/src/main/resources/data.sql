-- Insert first admin user with encoded password (password: Admin123!)
INSERT INTO admins (email, password, first_name, last_name, phone, date_of_birth, created_at, updated_at)
SELECT 'admin@recyclehub.com', '$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa', 'Admin', 'User', '+1234567890', '1990-01-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM admins WHERE email = 'admin@recyclehub.com'
);
