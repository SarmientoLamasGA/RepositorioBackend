const ProductsService = require("../services/productos.service");
const productsDB = new ProductsService();
const CartService = require("../services/cart.service");
const cartDB = new CartService();
const logError = require("../utils/logger.error");

class ProductController {
  async getAll(req, res) {
    try {
      const user = req.user;
      const prodList = await productsDB.getAll();
      res.render("pages/shop", { data: prodList, user });
    } catch (error) {
      res.render("Ha ocurrido un error");
    }
  }

  async addToCart(req, res) {
    {
      const user = req.user;
      const idCart = user.UId;
      const cart = await cartDB.getById(idCart);
      const prodList = await productsDB.getAll();
      const selectedProd = await productsDB.getById(req.body.UId);

      res.render("pages/shop", {
        data: prodList,
        saveData: await cartDB.addToCart(cart, selectedProd, idCart),
        user,
      });
    }
  }

  async deleteAllCarts(req, res) {
    {
      res.send(await productsDB.deleteAll());
    }
  }

  async loadSection(req, res) {
    try {
      const user = req.user;
      const prodList = await productsDB.getAll();
      res.render("pages/loadProducts", { data: prodList, user });
    } catch (error) {
      res.render("Ha ocurrido un error");
    }
  }
  async loadProduct(req, res) {
    {
      try {
        const user = req.user;
        res.render("pages/loadProducts", {
          data: await productsDB.getAll(),
          saveData: await productsDB.save(req.body),
          user: user,
        });
      } catch (error) {
        res.render("Ha ocurrido un error");
      }
    }
  }

  async getById(req, res) {
    {
      if (req.params.id) {
        const user = req.user;
        const prod = await productsDB.getById(req.params.id);
        if (prod) {
          res.render("pages/prodInfo", { user, prod });
        } else {
          logError(req.params.id);
          res.send({ Error: "Producto inexistente" });
        }
      } else {
        return await productsDB.getAll();
      }
    }
  }

  async updateProd(req, res) {
    {
      const idExist = await productsDB.getById(req.params.id);
      if (idExist) {
        res.send(await productsDB.modify(req.params.id, req.body));
      } else {
        res.send({ Info: "No existe el producto" });
      }
    }
  }

  async deleteProd(req, res) {
    {
      const idExist = await productsDB.getById(req.params.id);
      if (idExist) {
        await productsDB.deleteDoc(req.params.id);
        res.redirect("/");
      } else {
        res.send({ Info: "No existe el producto" });
      }
    }
  }

  async searchCategory(req, res) {
    {
      const user = req.user;
      if (req.params.category) {
        const prod = await productsDB.getByCategory(req.params.category);
        if (prod.length > 0) {
          res.render("pages/category", { user, prod });
        } else {
          const prodList = await productsDB.getAll();
          res.render("pages/loadProducts", { data: prodList, user });
        }
      } else {
        return await productsDB.getAll(); //Se obtiene todo el contenido
      }
    }
  }
}

module.exports = ProductController;
