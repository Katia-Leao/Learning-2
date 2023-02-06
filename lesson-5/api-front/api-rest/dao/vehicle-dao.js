const connDb = require("../infra/connection");
const { ulid } = require("ulid");

class Vehicle {
  create(data, callback) {
    const brandEdit = data.brand.toUpperCase();
    const priceEdit = `R$ ${data.price}`;
    const { model } = data;

    const sql = `INSERT INTO vehicles (id, model, brand, price) VALUES ('${ulid()}', '${model}', '${brandEdit}', '${priceEdit}')`;
    connDb.run(sql, callback);
  }

  findAll(callback) {
    const sql = "SELECT * FROM vehicles";
    connDb.all(sql, callback);
  }

  findOne(id, callback) {
    const sql = `SELECT * FROM vehicles WHERE id = '${id}'`;
    connDb.get(sql, callback);
  }

  findBrand(brand, callback) {
    const sql = `SELECT * FROM vehicles WHERE brand like '${brand}%'`;
    connDb.get(sql, callback);
  }

  updatePartial(id, data, callback) {
    //console.log (id, data);
    //console.log (Object.keys(data));
    //console.log (Object.values(data));
    //console.log (Object.entries(data));

    let vehicleData = Object.entries(data);
    let fields = [];
    for (let i = 0; i < vehicleData.length; i++) {
      fields.push(`${vehicleData[i][0]} = '${vehicleData[i][1]}'`);
    }

    const sql = `UPDATE vehicles SET ${fields.join(",")} WHERE id = '${id}'`;
    connDb.run(sql, callback);
  }

  delete(id, callback) {
    const sql = `DELETE FROM vehicles WHERE id = '${id}'`;
    connDb.run(sql, callback);
  }
}

module.exports = new Vehicle();
