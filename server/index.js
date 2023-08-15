const express = require("express");//  imports the Express framework, which is a web application framework for Node.js. It simplifies the process of building robust and scalable web applications.
const app = express(); //creates an instance of the Express application, which will be used to define routes and handle incoming HTTP requests.
const mysql = require("mysql");//imports the MySQL module, which provides tools for interacting with MySQL databases.
const cors = require("cors");// imports the cors middleware, 'Cross-Origin Resource Sharing' which allows a web application from one origin (domain) to make requests to a different origin.

app.use(cors());//enabling the application to respond to requests from different origins (domains or ports) 
app.use(express.json());// Express application to automatically parse(convert data from 1 format to another) incoming JSON data from POST and PUT requests

const db = mysql.createConnection({//variable will store the MySQL database connection object. You can use this object to interact with the database by executing queries and commands.
  //'createConnection' creates a new connection to the MySQL database and returns a connection object.
  user: "root",
  host: "localhost",
  password: "root123",
  database: "employeesystem",
});//By providing configuration object, you're specifying the necessary information to establish a connection to the MySQL database.

app.post("/create", (req, res) => {//POST request--> creation of a new employee record. //method provided by the Express framework to define a route that handles HTTP POST requests.
  //Inside this function, you will define the logic to handle the creation of an employee record.
  const name = req.body.name;//line extracts the value of the name field from the (frontend request received) request body.
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  //It expects the client to send a POST request to the /create URL with a JSON payload containing the employee's information, including name, age, country, position, and wage. 
  //Each piece of information is extracted from the request body and stored in separate variables (name, age, country, position, wage).
  //use these values to insert a new record into a databaseS.
  db.query(//method provided by the MySQL connection object (db) that allows you to execute SQL
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)", //SQL queries will be replaced with actual values when the query is executed.
    [name, age, country, position, wage],//'?' represents values received in http request. =>'?' will be replaced by actual values when query will be executed.
    (err, result) => {
      if (err) {

        console.log(err + "euu");
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {// defines a route that handles a GET request to retrieve a list of employees.
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {// defines a route that handles a PUT request to update an employee's wage using unique identifier 'id' in employee table which will be extracted from the client request.
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => { // defines a route that handles a DELETE request to delete an employee's record using unique identifier 'id' which will be extracted from the client request. 
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => { //method is used to start the Express server and make it listen for incoming HTTP requests.
  console.log("Yey, your server is running on port 3001");
});
