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
// indexRoute.use("/htmlconnect", htmlRoute);

application.use(express.json());
application.use(express.urlencoded({extended: true}));//url (api for CRUD and html for webpages) gives instructions 
application.use(express.static("public"));//root for express, so start from the HTMLs
application.use("/api", indexRoute);
application.use("/", htmlRoute); //html pages
//application.use("/apidata", apiRoute);

// application.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "/public/index.js"));
//   });

application.listen(port, () => //do whatever follows
console.log(`http://localhost:${port}`));

// addEventListener("click", function(event) {
//     if (event.target.href === "http://localhost:5009/api/Develop/public/notes") {
//         window.location.href = "http://localhost:5009/api/Develop/public/notes";
//     }
// });
// addEventListener (event) { 
//     if (event === "/notes")
//     window.location.href = "http://localhost:5009/api/Develop/public/notes"
// };
// const express = require(‘express’);
// const apiRoutes = require(‘./routes/apiRoutes’);
// const htmlRoutes = require(‘./routes/htmlRoutes’);
// // Initialize the app and create a port
// const app = express();
// const PORT = process.env.PORT || 3001;
// // Set up body parsing, static, and route middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(‘public’));
// app.use(‘/api’, apiRoutes);
// app.use(‘/’, htmlRoutes);
// // Start the server on the port
// app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));