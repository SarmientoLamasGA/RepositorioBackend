const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:8080/api/productos";

//Modifique el router para que devuelve un JSON porque sino, el res.body recibía un {} vacío
describe("Get all productos ", () => {
  it("Debería mostrar todos los productos: ", (done) => {
    chai
      .request(url)
      .get("/")
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

//Funciona con los ID existentes, los no existentes no pasa las pruebas
describe("Get by ID: ", () => {
  it("Debería mostrar producto con ID 2: ", (done) => {
    chai
      .request(url)
      .get("/2")
      .end(function (err, res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("UId").to.be.equal(2);
        done();
      });
  });
});

//Crea un producto correctamente
// describe("Se agrega un producto nuevo: ", () => {
//   it("Debería agregar el producto", (done) => {
//     chai
//       .request(url)
//       .post("/cargar-productos")
//       .send({
//         title: "MochaChai",
//         price: 5050,
//         thumbnail: "https://images.media-allrecipes.com/userphotos/4519280.jpg",
//         description: "Este es un producto de prueba",
//       })
//       .end(function (err, res) {
//         console.log(res.body);
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe("Se modifica el producto con ID elegido: ", () => {
//   it("Debería editar el producto", (done) => {
//     chai
//       .request(url)
//       .put("/1")
//       .send({
//         title: "Nombre modificado",
//         price: 000,
//       })
//       .end(function (err, res) {
//         console.log(res.body);
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

// describe("Se borra el producto con ID elegido: ", () => {
//   it("Debería borrar el producto", (done) => {
//     chai
//       .request(url)
//       .delete("/21")
//       .end(function (err, res) {
//         console.log(res.body);
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });
