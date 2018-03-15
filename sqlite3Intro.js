// Require in the Database method from the sqlite3 module
const {
    Database
} = require('sqlite3').verbose();
const db = new Database('example.sqlite', () => console.log('Connected!'));

const employeeArray = [{
        id: 3,
        firstName: 'Dwight',
        lastName: 'Schrute'
    },
    {
        id: 4,
        firstName: 'Andy',
        lastName: 'Bernard'
    },
    {
        id: 5,
        firstName: 'Pam',
        lastName: 'Beesly'
    }
];

let createDb = () => {
    db.run('DROP TABLE IF EXISTS employees')
        .run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT)");
    db.run("INSERT INTO employees (id, first, last) VALUES (1, 'Michael', 'Scott')");
    db.run("INSERT INTO employees VALUES (2, 'Jim', 'Halpert')");


   employeeArray.forEach((obj) => {
  // Using ES6 string templating, we can create an insert statement for each object
  db.run(`INSERT INTO employees VALUES (${obj.id}, '${obj.firstName}', '${obj.lastName}')`);
});

};

createDb();

let getEmployees = () => {
    db.all("SELECT * FROM employees", (err, allRows) => {
        // allRows is an array containing each row from the query
        allRows.forEach(each => {
            console.log(each.id, each.first + ' ' + each.last);
        });
    });

}
getEmployees();

db.close(err => {
    errorHandler(err); // Use custom error handling function
    console.log('Database closed'); // Will only log on successful close
  })