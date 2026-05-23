Create database users;
use users;
create table users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);
insert into users(name,email,password)
values
('Mukesh','mukesh@gmail.com','12345'),
('Ravi','ravi@gmail.com','ravi123');