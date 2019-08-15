INSERT INTO users
    (displayname,username)
VALUES
    ('Alice', 'catLover'),
    ('Bob', 'puppy_lover');

INSERT INTO todos
    (priority, task,user_id)
VALUES 
    (1,'Feed the dog',1),
    (2,'Pet the dragon',1),
    (3,'Stab the cat',2),
    (2,'Buy dog food',2),
    (4,'Feed the fish',1);

SELECT * FROM todos;