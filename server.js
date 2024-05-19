const express = require("express");//middleware to communicate to everything
const path = require("path");//easy directory names
//const api = require(); add it when ready
//const port = process.env.port || 3001; add it when ready
const port = 5009;
const application = express();

const indexRoute = require("./routes/index.js");
// const apiRoute = require("./routes/apidata.js");
const htmlRoute = require("./routes/htmlconnect.js")
// Set up body parsing, static, and route middleware

// indexRoute.use("/apidata", apiRoute);//./index.js/apidata/routes/apidata.js
application.use(express.json());//enable JSON body parsing in an express() application. Translation:
//(NEW EX.APP.)new instance of Express app().(ADD MID. PIPE.)add middleware to app's request handling pipeline(automatically parse JSON data, makes it available in req.body of the request object)
application.use(express.urlencoded({extended: true}));//url (api for CRUD and html for webpages) gives instructions 
//sets up middleware in an EX>APP to parse incoming request bodies. Translation:
//NEW EX.APP.ADD MID. PIPE(tell Express to use this middleware for incoming requests to parse URL-encoded data, make it available in the req.body object of the request.)
application.use(express.static("public"));//root for express, so start from the HTMLs.
//serve all static files located in the "public" folder, make it accessible by clients through the specified route.
application.use("/api", indexRoute);//sets up route in an express() app. to handle requests starting with "/api" by importing & using the routes defined in the "./routes/index.js" file. Translation:
//NEW EX.APP.ADD MID. PIPE("base path for the middleware", import this route from line 8)
application.use("/", htmlRoute); //html pages
application.listen(port, () => //do whatever follows
console.log(`http://localhost:${port}`));

