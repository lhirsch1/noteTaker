
//declaring dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

//setting port value. will search for environment variable first, then will set to 8080 if none is found
var PORT =  process.env.PORT || 8080;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



//gets json data
var notesDataRaw = fs.readFileSync('./db/db.json', "utf8");
var notesData = JSON.parse(notesDataRaw);



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
    fs.writeFile('./db/db.json', JSON.stringify(notesData), function(err){
      if(err){
        console.log(err)
      }
    })
    console.log("post push :", notesData)
    

  })
  

  app.delete('/api/notes/:id', function(req,res){
      //res.send('note deleted')
      //reference notesArray req.params.id and delete note at the selected index
      res.json(true);
      console.log("delete route hit")
  })

  //get"*" will serve the user index.html if they try to go to a page that does not exist
  app.get("*",function(req,res){
    res.sendFile(path.join(__dirname, "/public/index.html"))
  });

  