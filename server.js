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
cmsPrompt();

function cmsPrompt() {

  inquirer
  .prompt({
      type: "list",
      name: "task",
      message: "Choose option: ",
      choices: [
          "View Employees",
          "View Employees by Department",
          "Add Employee",
          "Remove Employees",
          "Update Employee Role",
          "Add Role",
          "End"
        ]
})
  .then(function ({ task }) {
      switch (task) {
          case "View Employees":
          viewEmployee();
          break;
          case "View Employees by Department":
          viewEmployeeByDepartment();
          break;
          case "Add Employee":
          addEmployee();
          break;
          case "Remove Employees":
          removeEmployees();
          break;
          case "Update Employee Role":
          updateEmployeeRole();
          break;
          case "Add Role":
          addRole();
          break;
          case "End":
          connection.end();
          break;
      }
  });
}






// ? is a placeholder