var mysql = require("mysql");
var inquirer = require("inquirer");
// var cTable = require("console.table");

var con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Nepal1@",
  database: "Employee",
  multipleStatements: true,
});
//establishing connection, confirming success/failure
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected as id " + con.threadId + "\n");
  HomeView();
});

function HomeView() {
  inquirer
    .prompt([
      {
        message: "Whate would you like to do? (Use arrow keys)",
        type: "list",
        choices: [
          "View all Employee",
          "View All Employee By Department",
          "View All Employees By Role",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View the total utilized budget of a department",
          "Exit\n",
        ],
        name: "task",
      },
    ])
    .then(function (answer) {
      var task = answer.task;
      switch (task) {
        case "View all Employee":
          DetailTableView();
          break;
        case "View All Employee By Department":
          EmployeeByDepartment();
          break;
        case "View All Employees By Role":
          viewEmployeeByRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          deleteEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager() 
          break;
        case "Add Roles":
          addRole();
          break;
        case "View the total utilized budget of a department":
          viewTotalUtilizedBudget()
          break;
        case "Exit \n":
          exit();
          break;
      }
    });
}

function DetailTableView() {
  con.query(
    "SELECT e.id,e.first_name,e.last_name,r.title,d.name,r.salary from Employee AS e LEFT JOIN Roles as r ON e.role_id =r.id LEFT JOIN department as d ON r.department_id=d.id",
    function (err, data) {
      if (err) throw err;
      console.log("\n");
      console.table(data);
      HomeView();
    }
  );
}

function EmployeeByDepartment() {
  con.query(
    "SELECT d.id as value,d.name FROM department as d",
    function (err, data) {
      if (err) throw err;
      console.log("\n");
      inquirer
        .prompt([
          {
            message: "Please choose department",
            type: "list",
            choices: data,
            name: "department",
          },
        ])
        .then(function (answer) {
          var dept = answer.department;
          EmployeByDepartment(dept);
        })
        .catch((e) => console.log(e));
    }
  );
}

function EmployeByDepartment(id) {
  con.query(
    `SELECT e.id,e.first_name,e.last_name,r.title,d.name,r.salary from Employee AS e LEFT JOIN Roles as r ON e.role_id =r.id LEFT JOIN department as d ON r.department_id=${id}`,
    function (err, data) {
      if (err) throw err;
      console.log("\n");
      console.table(data);
      HomeView();
    }
  );
}

async function addEmployee() {
  let dept;
  let role;
  con.query(
    "SELECT r.id as value,r.title as name FROM Roles as r;SELECT d.id as value,d.name FROM department as d",
    function (err, data) {
      if (err) throw err;
      role = data[0];
      dept = data[1];
      inquirer
        .prompt([
          {
            message: "First Name:",
            type: "input",
            name: "fname",
          },
          {
            message: "Last Name:",
            type: "input",
            name: "lname",
          },
          {
            message: "Choose Department:",
            type: "list",
            choices: dept,
            name: "dept",
          },
          {
            message: "Choose Roles:",
            type: "list",
            choices: role,
            name: "role",
          },
        ])
        .then(function (answer) {
          var newDept = answer.dept;
          var newRole = answer.role;
          var newFname = answer.fname;
          var newLname = answer.lname;
          con.query(
            "INSERT INTO Employee (first_name, last_name,role_id,manager_id) VALUES (?,?,?,?)",
            [newFname, newLname, newRole, newDept],
            function (err) {
              if (err) throw err;
              HomeView();
            }
          );
        });
    }
  );
}

function viewEmployeeByRole() {
  con.query(
    "SELECT r.id AS value, r.title AS name FROM Roles as r",
    function (err, data) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            message: "Choose Roles:",
            type: "list",
            choices: data,
            name: "roles",
          },
        ])
        .then(function (answer) {
          var role = answer.roles;
          con.query(
            `SELECT e.id,e.first_name,e.last_name,r.title,d.name,r.salary from Employee AS e LEFT JOIN Roles as r ON e.role_id =${role} LEFT JOIN department as d ON r.department_id=d.id`,
            function (err, data) {
              if (err) throw err;
              console.log("\n");
              console.table(data);
              HomeView();
            }
          );
        });
    }
  );
}

function deleteEmployee() {
  con.query(
    "SELECT e.id,e.first_name,e.last_name,r.title,d.name,r.salary from Employee AS e LEFT JOIN Roles as r ON e.role_id =r.id LEFT JOIN department as d ON r.department_id=d.id",
    function (err, data) {
      if (err) throw err;
      console.log("\n");
      console.table(data);
      inquirer
        .prompt([
          {
            message: "Please enter employee ID:",
            type: "input",
            name: "id",
          },
        ])
        .then(function (answer) {
          var id = answer.id;
          con.query(
            `DELETE FROM Employee WHERE id =${id};`,
            function (err, data) {
              if (err) throw err;
              DetailTableView();
            }
          );
        })
        .catch((e) => console.log(e));
    }
  );
}


function updateEmployeeRole() {
  con.query(
    "SELECT e.id,e.first_name,e.last_name,r.title,d.name,r.salary from Employee AS e LEFT JOIN Roles as r ON e.role_id =r.id LEFT JOIN department as d ON r.department_id=d.id",
    function (err, data) {
      if (err) throw err;
      console.log("\n");
      console.table(data);
      inquirer
        .prompt([
          {
            message: "Please enter employee ID you want to update Role:",
            type: "input",
            name: "id",
          },
        ])
        .then(function (answer) {
          var id = answer.id;
          con.query(
            `SELECT r.id AS value, r.title AS name FROM Roles as r`,
            function (err, role) {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    message: "Choose Roles:",
                    type: "list",
                    choices: role,
                    name: "roles",
                  },
                ])
                .then(function (answer) {
                  var role = answer.roles;
                  con.query(
                    `UPDATE Employee SET role_id=${role} WHERE id=${id}`,
                    function (err, data) {
                      if (err) throw err;
                      console.log("\n");
                     DetailTableView()
                    }
                  );
                });
            }
          );
        })
        .catch((e) => console.log(e));
    }
  );
}


function updateEmployeeManager() {
  con.query(
    "SELECT e.id,e.first_name,e.last_name,r.title FROM Employee as e LEFT JOIN Roles AS r on r.title ='manager'",
    function (err, data) {
      if (err) throw err;
      console.log("\n");
      console.table(data);
      inquirer
        .prompt([
          {
            message: "Please enter employee ID you want to Update manager:",
            type: "input",
            name: "id",
          },
        ])
        .then(function (answer) {
          var id = answer.id;
          con.query(
            `SELECT r.id AS value, r.title AS name FROM Roles as r WHERE r.title="manager"`,
            function (err, role) {
              if (err) throw err;
              inquirer
                .prompt([
                  {
                    message: "Choose Roles:",
                    type: "list",
                    choices: role,
                    name: "roles",
                  },
                ])
                .then(function (answer) {
                  var role = answer.roles;
                  con.query(
                    `UPDATE Employee SET role_id=${role} WHERE id=${id}`,
                    function (err, data) {
                      if (err) throw err;
                      console.log("\n");
                     DetailTableView()
                    }
                  );
                });
            }
          );
        })
        .catch((e) => console.log(e));
    }
  );
}


async function addRole() {
  con.query(
    "SELECT d.id as value,d.name FROM department as d",
    function (err, data) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            message: "title:",
            type: "input",
            name: "title",
          },
          {
            message: "salary:",
            type: "input",
            name: "salary",
          },
          {
            message: "Choose Department:",
            type: "list",
            choices: data,
            name: "deptartment_id",
          },
        ])
        .then(function (answer) {
         const {title, salary, department_id } = answer;
          con.query(
            "INSERT Roles (title,salary,department_id) VALUES (?,?,?)",
            [title,salary,department_id],
            function (err) {
              if (err) throw err;
              DetailTableView()
              HomeView();
            }
          );
        });
    }
  );
}


function viewTotalUtilizedBudget(){
  con.query('SELECT SUM(r.salary) as s FROM Roles as r',function(err,data){
    if(err) throw err;
    console.log('total salary:',data[0].s)
    HomeView()
  })
}