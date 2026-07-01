CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trading_systems (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE psychology_states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE trading_pairs (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(30) UNIQUE NOT NULL,
    category VARCHAR(50)
);

CREATE TABLE mt5_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    broker VARCHAR(255),
    login VARCHAR(100),
    server VARCHAR(255),
    last_sync TIMESTAMP
);

CREATE TABLE trades (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

    mt5_ticket BIGINT,

    symbol VARCHAR(30) NOT NULL,

    direction VARCHAR(10) NOT NULL,

    entry_price NUMERIC(18,8),
    stop_loss NUMERIC(18,8),
    take_profit NUMERIC(18,8),
    exit_price NUMERIC(18,8),

    lot_size NUMERIC(10,2),

    profit_money NUMERIC(12,2),
    profit_pips NUMERIC(12,2),

    risk_amount NUMERIC(12,2),

    open_time TIMESTAMP,
    close_time TIMESTAMP,

    duration_minutes INTEGER,

    session_name VARCHAR(30),

    trading_system_id INTEGER REFERENCES trading_systems(id),

    psychology_state_id INTEGER REFERENCES psychology_states(id),

    tradingview_link TEXT,

    screenshot_path TEXT,

    notes TEXT,

    imported_from_mt5 BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trade_tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE trade_tag_map (
    trade_id INTEGER REFERENCES trades(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES trade_tags(id) ON DELETE CASCADE,
    PRIMARY KEY(trade_id, tag_id)
);

CREATE TABLE screenshots (
    id SERIAL PRIMARY KEY,

    trade_id INTEGER REFERENCES trades(id) ON DELETE CASCADE,

    image_path TEXT NOT NULL,

    description TEXT,

    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_coach_reports (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    report_text TEXT
);

CREATE TABLE daily_statistics (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id),

    stat_date DATE,

    total_trades INTEGER,

    wins INTEGER,

    losses INTEGER,

    profit_money NUMERIC(12,2),

    win_rate NUMERIC(5,2)
);

CREATE TABLE pair_statistics (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id),

    symbol VARCHAR(30),

    total_trades INTEGER,

    wins INTEGER,

    losses INTEGER,

    total_pips NUMERIC(12,2),

    total_profit NUMERIC(12,2),

    win_rate NUMERIC(5,2)
);

CREATE TABLE psychology_statistics (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id),

    psychology_state_id INTEGER REFERENCES psychology_states(id),

    total_trades INTEGER,

    wins INTEGER,

    losses INTEGER,

    total_profit NUMERIC(12,2),

    win_rate NUMERIC(5,2)
);

CREATE TABLE system_statistics (
    id SERIAL PRIMARY KEY,

    user_id INTEGER REFERENCES users(id),

    trading_system_id INTEGER REFERENCES trading_systems(id),

    total_trades INTEGER,

    wins INTEGER,

    losses INTEGER,

    total_profit NUMERIC(12,2),

    win_rate NUMERIC(5,2)
);