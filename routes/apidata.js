const {readFromFile, readAndAppend, writeToFile} = require("../helpers/fsUtils");//pulls functions from that file
//running CRUD functions
const apiApp = require('express').Router();//see diagnostics.js
const { v4: uuidv4 } = require('uuid'); //this was updated from last year

apiApp.get("/", (req, res) => {     
    readFromFile("./db/db.json").then((data) => {
        console.log(data); //this is required to make it function?
        res.json(JSON.parse(data));
    });
});
//catch errors?
apiApp.post("/", (req, res) => {
    const {title, text} = req.body;
    const newJSONData = {
        title: title, text: text, id: uuidv4()
    }; //retrieves the texts
    if (title && text) {
        const parsedData = readAndAppend(newJSONData, "./db/db.json"); //goes to the same place, but needs body of HTML
        res.json(parsedData);  //saves in the file
        // const response = {
        //     status: "came through",
        //     body: newJSONData }
        
    } else {
        res.json("error from apiData")
    }
});
apiApp.delete("/:id", (req, res) => {
    const id = req.params.id;
    readFromFile("./db/db.json").then((data) => {
    let newData = JSON.parse(data);
        newData = newData.filter(note => note.id != id)
        res.json(newData);
    writeToFile("./db/db.json", newData);
    });
});
module.exports = apiApp;