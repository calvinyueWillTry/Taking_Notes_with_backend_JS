const apply = require("express").Router();
const path = require("path");
apply.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html")); //../meant go to the same level
});
apply.get("/notes", (req, res) => { //serves request from the GET STARTED button
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    //directs to that file in the folder
});

module.exports = apply;