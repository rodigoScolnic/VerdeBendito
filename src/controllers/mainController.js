import { Op } from "sequelize";
import db from "../data/models/index.js";

const mainController = {
  index: async (req, res, next) => {
    try {
      const [allCategories, featuredProducts] = await Promise.all([
        db.Category.findAll({ order: [["name", "ASC"]] }),
        db.Product.findAll({ include: [{ model: db.Category, as: "category", required: false }], order: [["id", "DESC"]], limit: 8 })
      ]);
      res.render("index", { allCategories, featuredProducts });
    } catch (error) { next(error); }
  },
  products: async (req, res, next) => {
    try {
      const categoryId = /^\d+$/.test(req.query.category_id || "") ? Number(req.query.category_id) : "";
      const priceMin = req.query.price_min || "";
      const priceMax = req.query.price_max || "";
      const name = String(req.query.name || "").trim().slice(0, 80);
      const where = {};
      if (categoryId) where.category_id = categoryId;
      const min = priceMin !== "" && Number.isFinite(Number(priceMin)) ? Number(priceMin) : null;
      const max = priceMax !== "" && Number.isFinite(Number(priceMax)) ? Number(priceMax) : null;
      if (min !== null || max !== null) {
        where.price = {};
        if (min !== null && min >= 0) where.price[Op.gte] = min;
        if (max !== null && max >= 0) where.price[Op.lte] = max;
      }
      if (name) where[Op.or] = [
        { name: { [Op.like]: `%${name}%` } },
        { nickname: { [Op.like]: `%${name}%` } }
      ];
      const [allProducts, allCategories] = await Promise.all([
        db.Product.findAll({ where, include: [{ model: db.Category, as: "category", required: false }], order: [["name", "ASC"]] }),
        db.Category.findAll({ order: [["name", "ASC"]] })
      ]);
      res.render("products", { allProducts, allCategories, filters: { categoryId, priceMin, priceMax, name } });
    } catch (error) { next(error); }
  },
  productDetail: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const product = Number.isInteger(id) && id > 0 ? await db.Product.findByPk(id, {
        include: [{ model: db.Category, as: "category", required: false }]
      }) : null;
      if (!product) return res.status(404).render("error", {
        title: "Producto no encontrado", message: "El producto que buscás no está disponible."
      });
      res.render("product", { product });
    } catch (error) { next(error); }
  },
  search: async (req, res, next) => {
    try {
      const q = String(req.query.q || "").trim().slice(0, 80);
      if (q.length < 2) return res.json([]);
      const results = await db.Product.findAll({
        attributes: ["id", "name", "nickname", "price", "image"],
        where: { [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { nickname: { [Op.like]: `%${q}%` } }
        ] },
        limit: 8, order: [["name", "ASC"]]
      });
      res.json(results);
    } catch (error) { next(error); }
  }
};
export default mainController;