console.log("==== API REST====");

const { PORT } = require("dotenv").config().parsed;
const express = require("express");
const app = express();
// as duas linhas de cima são a mesma coisa que:
// const app = require ("express")();

//Middleware
const cors = require("cors");
app.use(express.json());
app.use(cors());

/* em versões anteriores do express, tem que instalar o módulo body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
 */

//Mapeamento de rotas
const vehicles = require("../routes/vehicles-routes");
vehicles(app);
// as duas linhas de cima são a mesma coisa que:
//require("../routes/vehicles")(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
