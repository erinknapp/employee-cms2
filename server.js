const express = require('express');
const db = require('./db/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const inputCheck = require('./utils/inputCheck');


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
cmsPrompt();

function cmsPrompt() {

  inquirer
  .prompt({
      type: "list",
      name: "task",
      message: "Choose option: ",
      choices: [
          "View Employees",
          "Add Employee",
          "Remove Employees",
          "View Employees by Department",
          "Add Department",
          "Update Employee Role",
          "Add Role",
          "End"
        ]
})
  .then(function ({ task }) {
      switch (task) {
          case "View Employees":
          getEmployees();
          break;
          case "Add Employee":
          createEmployee();
          break;
          case "Remove Employees":
          deleteEmployee();
          break;
          case "View Employees by Department":
          viewEmployeesDepartment();
          break;
          case "Add Department":
          addDepartment();
          break;
          case "Update Employee Role":
          updateRole();
          break;
          case "Add Role":
          createRole();
          break;
          case "End":
          connection.end();
          break;
      }
  });
}

function getEmployees() {
  const sql = `SELECT employee.*, role.name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id 
    WHERE candidates.id = ?`;

    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  };

  function getEmployeesDepartment() {
    const sql =`SELECT 
          department.id, 
          department.name, 
          role.salary
      FROM employee
      LEFT JOIN role 
          ON employee.role_id = role.id
      LEFT JOIN department
          ON department.id = role.department_id
      GROUP BY department.id, department.name, role.salary`;

    db.query(query,(err, res) => {
        if (err) throw err;
        const deptChoices = res.map((choices) => ({
            value: choices.id, name: choices.name
        }));

        console.table(res);
        getDept(deptChoices);
    });
};

function getDept(deptChoices) {
  inquirer
      .prompt([
          {
              type: 'list',
              name: 'department',
              message: 'Departments: ',
              choices: deptChoices
          }
      ]).then((res)=>{ 
      let query = `SELECT 
                      employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name
                  FROM employee
                  JOIN role
                      ON employee.role_id = role.id
                  JOIN department
                      ON department.id = role.department_id
                  WHERE department.id = ?`

      db.query(query, res.department,(err, res) => {
          if (err) throw err;
          cmsPrompt();

          console.table(res);
      });
  })
};

  function createEmployee() {
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
  };
  
  function deleteEmployee () {
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
  };

  function updateRole() {
    const sql = `INSERT INTO role (employee_id, role_id) VALUES (?,?)`;
    const params = [body.employee_id, body.role_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
  };

  function addDepartment() {
    inquirer
        .prompt([
            {
            type: "input",
            name: "name",
            message: "Department Name: "
            }
        ]).then((res) => {
        let query = `INSERT INTO department SET ?`;

        db.query(query, {name: res.name},(err, res) => {
            if (err) throw err;
            
            cmsPrompt();
        });
    });
};

  function createRole (role) {
    inquirer
        .prompt([
        {
            type: "input",
            name: "firstName",
            message: "Employee First Name: "
        },
        {
            type: "input",
            name: "lastName",
            message: "Employee Last Name: "
        },
        {
            type: "list",
            name: "roleId",
            message: "Employee Role: ",
            choices: role
        }
        ]).then((res) => {
       const sql = `INSERT INTO employee SET ?`;
       const params = [body.first_name, body.last_name, body.role_id];
       
       db.query(sql, params, (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: 'success',
          data: body,
          changes: result.affectedRows
        });
      });
    })};

  
    app.use((req, res) => {
      res.status(404).end();
  });
  
  // DB connection
  db.connect(err => {
      if (err) throw err;
      console.log('Database connected.');
      app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
  });