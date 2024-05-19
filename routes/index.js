const routing = require("express").Router(); 
//add other route pages 
const routeAPI = require("./apidata");
//HTML route and data routes
routing.use("/notes", routeAPI); //combined with server.js line 19, 
module.exports = routing;
//modularize: take routes, break them down into separate files