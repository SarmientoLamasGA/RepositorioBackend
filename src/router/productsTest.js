const { Router } = require("express");
const logInfo = require("../../utils/logger.info");

// const fs = require("fs")
const containerProductsTest = require("../containers/containerProductsTest");
const productsTest = new containerProductsTest();

const router = new Router();

router.route("/").get(logInfo, async (req, res) => {
  try {
    res.json(await productsTest.createProdList());
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
