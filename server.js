const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

var PORT =  process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

//gets json data
var notesData = require('./db/db');



//starts server and listens for url changes
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });

  //express app serves index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  //serves notes
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

  //GET request to api
  app.get("/api/notes", function(req,res){
    console.log("get route hit")
    res.json(notesData);
  })

  app.post("/api/notes", function(req,res){
    console.log("post route hit")
    console.log("pre push :" ,notesData)
    console.log("req body :",req.body)
    //pushes new note into nodesData array
    notesData.push(req.body)
    console.log("post push :", notesData)

  })
  

  app.delete('/api/notes/:id', function(req,res){
      //res.send('note deleted')
      //reference notesArray req.params.id and delete note at the selected index
      res.json(true);
      console.log("delete route hit")
  })

  // app.post("/api/tables", function(req, res) {
  //   // if there are less than 5 tables
  //   if (tableData.length < 5) {
  //     // req.body is fed it's value via our middleware from server just
  //       /*
  //         app.use(express.urlencoded({ extended: true }));
  //         app.use(express.json());
  //       */
  //     // req.body is an object containing the incoming data
  //      /*
  //     Below is our incoming data that will feed the req.body object
  //     {
  //       customerName: 'Tom'
  //       phoneNumber: 555-555-5555
  //       customerEmail: tom@gmail.com
  //       customerID: 1
  //     };
  //      */
  //     tableData.push(req.body);
  //     // res is our response object
  //     /*
  //       Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify().

  //       The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.
  //     */
  //     res.json({ message: 'Added to current reservation! You may be seated' });
  //   }
  //   else {
  //     waitListData.push(req.body);
  //     res.json(false);
  //   }
  // });