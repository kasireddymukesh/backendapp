import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// USERS
export async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users")
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
    )
    return rows[0]
}

export async function createUser(name, email, password) {
    const [result] = await pool.query(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name, email, password]
    )
    return getUser(result.insertId)
}

// RESTAURANTS
export async function getRestaurants() {
    const [rows] = await pool.query("SELECT * FROM restaurants")
    return rows
}

export async function getRestaurant(id) {
    const [rows] = await pool.query(
        "SELECT * FROM restaurants WHERE id = ?",
        [id]
    )
    return rows[0]
}

export async function createRestaurant(name, contact, address, owner, rating) {
    const [result] = await pool.query(
        "INSERT INTO restaurants (name,contact,address,owner,rating) VALUES (?,?,?,?,?)",
        [name, contact, address, owner, rating]
    )
    return getRestaurant(result.insertId)
}

export async function updateRestaurant(id, name, contact, address, owner, rating) {
    await pool.query(
        `UPDATE restaurants 
         SET name=?, contact=?, address=?, owner=?, rating=? 
         WHERE id=?`,
        [name, contact, address, owner, rating, id]
    )
    return getRestaurant(id)
}

export async function deleteRestaurant(id) {
    return pool.query("DELETE FROM restaurants WHERE id=?", [id])
}