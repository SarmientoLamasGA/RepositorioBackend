const { Router } = require("express");
// const fs = require("fs")
const containerProductsTest = require("../containers/containerProductsTest");
const productsTest = new containerProductsTest();

const router = new Router();

router.route("/").get(async (req, res) => {
  try {
    const list = await productsTest.createProdList();
    res.json({ list: await productsTest.createProdList() });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
