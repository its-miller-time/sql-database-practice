CREATE TABLE todos (
    id serial PRIMARY KEY,
    priority INTEGER NOT NULL,
    task VARCHAR NOT NULL,
    status BOOLEAN DEFAULT false
);

