const express = require('express');
const database = require('mime-db');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // your MySQL username
    user: 'root',
    // your MySQL password
    password: 'Athame@13',
    database: 'election'
  },
  console.log('Connected to the election datatbase.')
);

// test route
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello world'
//   });
// });

// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

// // get a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(row);
// });

// delete a single candidate
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});


// create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
    VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});



// default repsonse for any oher request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});