const express = require('express');
const res = require('express/lib/response');
const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table');
const inputCheck = require('./utils/inputCheck');
const { isBuffer } = require('util');

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


// GET all employees
app.get('/api/employee', (req, res) => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, rows) => {
    if(err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Get a single employee
app.get('/api/employee/:id', (req, res) => {
  const sql = `SELECT * FROM employee WHERE id=?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if(err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: row
    });
  });
});



// Delete an employee: DELETE FROM
app.delete('/api/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if(err) {
      res.statusMessage(400).json({ error: res.message });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

// Create employee
app.post('/api/employee', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'role_id', 'manager_id');
  if(errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO employee ('first_name', 'last_name', 'role_id', 'manager_id)
      VALUES (?, ?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if(err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });

});



// ? is a placeholder