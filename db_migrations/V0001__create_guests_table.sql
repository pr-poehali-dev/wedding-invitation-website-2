-- Создание таблицы для хранения ответов гостей
CREATE TABLE IF NOT EXISTS guests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guests_count INTEGER NOT NULL CHECK (guests_count >= 1 AND guests_count <= 20),
    email VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индекс для быстрого поиска по email
CREATE INDEX IF NOT EXISTS idx_guests_email ON guests(email);

-- Индекс для сортировки по дате создания
CREATE INDEX IF NOT EXISTS idx_guests_created_at ON guests(created_at DESC);
