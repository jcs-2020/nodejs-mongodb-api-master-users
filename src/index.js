const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const path = require("path");

//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
//swagger object passed to api-doc
const swaggerSpec ={
  definition:{
    openapi: "3.0.0",
    info: {
      title: "Node MongoDB API",
      version: "1.0.1"
    },
    servers: [
      {
        url: "http://localhost:9000",
        description: "User API Server"
      },
      {
        url: "http://localhost:8000",
        description: "Other Test Server"
      }
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
