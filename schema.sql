CREATE DATABASE resturant_db;
USE resturant_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE restaurants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    contact VARCHAR(20),
    address VARCHAR(255),
    owner VARCHAR(100),
    rating DECIMAL(2,1)
);