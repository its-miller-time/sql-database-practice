CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    displayname VARCHAR(20) NOT NULL,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE todos (
    id serial PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    priority INTEGER NOT NULL,
    task VARCHAR NOT NULL,
    status BOOLEAN DEFAULT false
);
