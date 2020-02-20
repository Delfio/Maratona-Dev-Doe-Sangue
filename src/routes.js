const { Router } = require("express");
const Doador = require("./schemas/doador");
const path = require("path");

const routes = Router();

// const donors = [
//   {
//     name: "Delfio Francisco",
//     blood: "A+"
//   },
//   {
//     name: "Diego Fernandes",
//     blood: "AB+"
//   }
// ];

routes.get("/", async function(req, res) {
  const doadores = await Doador.find()
    .select(["name", "blood"])
    .limit(6)
    .sort("createdAt: DESC");

  const donors = [];

  for (let i = 0; i < 6; i++) {
    if (doadores[i] !== undefined) {
      donors.push({
        name: doadores[i].name,
        blood: doadores[i].blood
      });
    }
  }

  return res.render(path.resolve(__dirname, "..", "public", "index.html"), {
    donors
  });
});

routes.post("/", async function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;
  const phone = req.body.phone;

  if (name == "" || email == "" || blood == "" || phone == "") {
    return res.send("Todos os campos são obrigatórios");
  }

  await Doador.create({
    name: name,
    email: email,
    blood: blood,
    phone: phone
  });

  return res.redirect("/");
});

module.exports = routes;
