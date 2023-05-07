require('dotenv').config()
const cors = require("cors");
const compression = require("compression");
import express from 'express';
import { routes } from './routes';
import { initializeDbConnection } from './db';
const app = express();
const http = require("http")
const bodyParser = require ('body-parser');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app)
// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });


// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());
app.use(compression())
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({ credentials: true, origin: "http://localhost:3000/" }));

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

