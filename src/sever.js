require("dotenv/config");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const nunjucks = require("nunjucks");
const app = express();

//configurar servidor para exibir arquivos extras - css e js
app.use(express.static(path.resolve(__dirname, "..", "public", "assets")));

//Permitindo o express receber dados pelo req.body
app.use(express.urlencoded({ extended: true }));

//Conectar ao banco Mongo Atlas
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

//Template engine - nunjuscks
nunjucks.configure("./", {
  express: app,
  noCache: true
});

//Rotas
app.use(routes);

app.listen(process.env.PORT || 3333);
