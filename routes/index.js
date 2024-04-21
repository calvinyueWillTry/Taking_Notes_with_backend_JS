const routing = require("express").Router(); 
//const { Router } = require("express");
//add other route pages 
const routeAPI = require("./apidata");
//const routeHTML = require("./htmlconnect");
//HTML route and data routes
routing.use("/notes", routeAPI); //combined with server.js line 19, 
module.exports = routing;
//Router.use("./apidata", routeAPI);
//routing.use("./htmlconnect", routeHTML);
//Router.use("./htmlconnect", routeHTML);

//modularize: take routes, break them down into separate files