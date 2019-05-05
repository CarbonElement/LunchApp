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
const port = 3000

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
    // Logs the request body for debugging purposes.
    console.log('req.body');
    console.log(req.body);
    // This checks if someone didn't sumbit the appropriate values to the HTML form and just left it default or empty.
    if(req.body.rest == '' || undefined) {
      res.send("not work: rest")
    } else if(req.body.smak == undefined || '') {
      res.send("not work: smak")
    } else if (req.body.username == '' || undefined) {
      res.send("not work: username")
    } else {
      res.send("work")
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

// Obvious! Listens on the port variable we set and then console logs so we know it's now listening
app.listen(port, () => console.log(`App listening on port ${port}!`))