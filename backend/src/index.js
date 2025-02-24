const express = require("express");
const ApiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const cors = require("cors");

const setupAndStartServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/iiitn", ApiRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`);
  });
};

setupAndStartServer();
