const express = require('express');
const res = require('express/lib/response');
const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express()

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
//cmsPrompt();


// GET a single employee
db.query('SELECT * FROM employee WHERE id = 1', (err, row) => {
  if(err) {
    console.log(err);
  }
  console.log(row);
});

// Delete an employee
db.query('DELETE FROM employee WHERE id = ?', 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});