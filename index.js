"use strict";

const express = require("express");
const app = express();

const path = require("path");

require("dotenv").config({ path: __dirname + "/.env" });

require("express-async-errors");

/* ---------Db Connection-------------------- */
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ---------Middlewares-------------------- */

//Accep to json
app.use(express.json());

//for static
app.use(express.static(path.join(__dirname, "public")));

//Cors

app.use(require("cors")());

//Filter
app.use(require("./src/middlewares/queryHandler"));

app.use(require("./src/middlewares/authentication"));

/* ---------Middlewares-------------------- */

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.all("/api/v1/documents", (req, res) => {
  res.send(`
        <h3>Stock Management API Service</h3>
        <hr>
        <p>
            Documents:
            <ul> 
                <li><a href="/api/v1/documents/swagger">SWAGGER</a></li>
                <li><a href="/api/v1/documents/redoc">REDOC</a></li>
                <li><a href="/api/v1/documents/json">JSON</a></li>
            </ul>
        </p>
    `);
});

/* ---------route-------------------- */
app.use("/api/v1", require("./src/routes/"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));

if (process.env.NODE_ENV == "development") {
  require("./src/helpers/sync")();
}
