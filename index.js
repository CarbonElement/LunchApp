/*
All work here is done by CarbonElement.
GitHub: https://github.com/CarbonElement/
*/

// Documented this so that if I forget this project, I can just come back and understand everything I left.

// Importing required modules and defining shortcuts for easier reference.
const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
// I am using chalk because I like colors.
const chalk = require('chalk')

// You can set the server port here.
const port = 80

// We're using bodyParser because express.js does not support parsing the request body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Load static files because express doesn't by default
app.use(express.static('public'));

// Sending an html file when someone visits the app on the root directory. Using path.join because for some reason it doesn't work without it
app.get('/', (req, res) =>
res.sendFile('index.html', {
    root: path.join(__dirname, './public')
})
)

// This app uses POST requests to insert data to the database. So when a POST request is sent to /insert we'll insert the data in the request to the database.
app.post('/insert', (req, res) => {
    // This checks if someone didn't sumbit the appropriate values to the HTML form and just left it default or empty.
    if(req.body.rest == '' || undefined) {
      res.send("<h1>[DEBUG]</h1> <h2>Error: rest is empty</h2>")
      console.log(chalk.blue('[DEBUG] ' + 'Error: rest is empty'))
    } else if(req.body.smak == undefined || '') {
      res.send("<h1>[DEBUG]</h1> <h2>Error: smak is empty</h2>")
      console.log(chalk.blue('[DEBUG] ' + 'Error: smak is empty'))
    } else if (req.body.username == '' || undefined) {
      res.send("<h1>[DEBUG]</h1> <h2>Error: username is empty</h2>")
      console.log(chalk.blue('[DEBUG] ' + 'Error: username is empty'))
    } else if(req.body.kvalitet == undefined || '') {
      res.send("<h1>[DEBUG]</h1> <h2>Error: kvalitet is empty</h2>")
      console.log(chalk.blue('[DEBUG] ' + 'Error: kvalitet is empty'))
    } else if(req.body.ravaror == undefined || '') {
      res.send("<h1>[DEBUG]</h1> <h2>Error: ravaror is empty</h2>")
      console.log(chalk.blue('[DEBUG] ' + 'Error: ravaror is empty'))
    } else {
      res.send("<h1>[DEBUG]</h1> <h2>work</h2>")
      console.log(chalk.blue('[DEBUG] ' + 'All inputs are not empty'))
    }
})

// Creates a conection to the MySQL database
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    database : "lunchapp"
  });

//Connects to the MySQL database connection
connection.connect();

// Listens on the port variable we set and then logs the credits because I wrote the project, and lets us know that it's listening on the port.
app.listen(port, () => {
   console.log('------------------------------------------')
   console.log(chalk.magenta.bold("Credits: CarbonElement/Khaled"))
   console.log(chalk.magenta.bold("https://github.com/CarbonElement/"))
   console.log('------------------------------------------')
   console.log(chalk.blue(`[DEBUG] LunchApp listening on port ${port}!`))
})