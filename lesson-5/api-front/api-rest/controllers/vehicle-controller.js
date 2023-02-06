const Vehicle = require("../dao/vehicle-dao");
console.log(Vehicle);

/* module.exports = {
  createOne: (req, res) => {
    res.send("post");
  },

  getAll: (req, res) => {
    res.send("GET - todos");
  },

  getId: (req, res) => {
    res.send("GET - id");
  },

  getModel: (req, res) => {
    res.send("GET - nome");
  },

  updateOne: (req, res) => {
    res.send("put");
  },

  deleteOne: (req, res) => {
    res.send("delete");
  },
}; */

//OUTRA FORMA DE ESCREVER O CÓDIGO ACIMA:

exports.createOne = (req, res) => {
  Vehicle.create(req.body, (err) => {
    if (!err) {
      res
        .status(201)
        .send({ msg: `Vehicle ${req.body.model} created successfully` });
    } else {
      res.status(400).send(err);
    }
  });
};

exports.getAll = (req, res) => {
  Vehicle.findAll((err, data) => {
    res.send(data);
  });
};

exports.getId = (req, res) => {
  Vehicle.findOne(req.params.id, (err, data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ errMsg: "id not found", err });
    }
  });
};

exports.getBrand = (req, res) => {
  const brand = req.params.brand;
  const brandEdit = brand.toUpperCase();
  Vehicle.findBrand(brandEdit, (err, data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ errMsg: "brand not found", err });
    }
  });
};

exports.updateOne = (req, res) => {
  Vehicle.updatePartial(req.params.id, req.body, (err) => {
    if (err) {
      res.status(400).send({ errMsg: err });
    } else {
      res.status(204).end();
    }
  });
};

exports.deleteOne = (req, res) => {
  Vehicle.delete(req.params.id, (err) => {
    if (!err) {
      res.status(204).end();
    }
  });
};

//OUTRA FORMA DE FAZER SERIA IMPLEMENTANDO UMA CLASSE. CADA UMA DESSAS FUNÇÕES SERIA UM MÉTODO. PARA INSTANCIAR, SERIA SÓ DAR UM NEW.
