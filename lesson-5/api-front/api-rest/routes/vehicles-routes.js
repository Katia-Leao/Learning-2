const vehiclesCtrl = require("../controllers/vehicle-controller");

module.exports = function (app) {
  //Criar um veículo - POST
  app.post("/", vehiclesCtrl.createOne);

  /*se eu quisesse colocar o endereço/vehicles, é só alterar o caminho assim:
  app.post("/vehicles", (req, res) => {
    res.send("post");
  });
  */

  //Recuperar todos os veículos - GET
  app.get("/", vehiclesCtrl.getAll);

  //Recuperar um veículo por ID - GET
  app.get("/:id", vehiclesCtrl.getId);

  //Recuperar um veículo por nome - GET
  app.get("/brand/:brand", vehiclesCtrl.getBrand);

  //Atualizar um veículo - PUT
  app.patch("/:id", vehiclesCtrl.updateOne);

  //Deletar um veículo - DELETE
  app.delete("/:id", vehiclesCtrl.deleteOne);
};
