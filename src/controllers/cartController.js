import { Op } from "sequelize";
import Product from "../data/models/Product.js";

const cartController = {
  index: async (req, res, next) => {
    try {
      const cart = req.session.cart || {};
      const ids = Object.keys(cart).map(Number).filter(Number.isInteger);
      if (!ids.length) return res.render("cart", { items: [], total: 0 });
      const products = await Product.findAll({ where: { id: { [Op.in]: ids } }, order: [["name", "ASC"]] });
      const found = new Set(products.map(p => String(p.id)));
      ids.forEach(id => { if (!found.has(String(id))) delete cart[id]; });
      req.session.cart = cart;
      const items = products.map(product => {
        const quantity = Number(cart[product.id] || 0);
        return { product, quantity, subtotal: Number(product.price) * quantity };
      }).filter(item => item.quantity > 0);
      res.render("cart", { items, total: items.reduce((sum, item) => sum + item.subtotal, 0) });
    } catch (error) { next(error); }
  },
  add: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const quantity = Math.max(1, Math.min(99, Number.parseInt(req.body.quantity, 10) || 1));
      const product = await Product.findByPk(id);
      if (!product) { req.session.notice = "No encontramos ese producto."; return res.redirect("/products"); }
      const cart = req.session.cart || {};
      const desired = Number(cart[id] || 0) + quantity;
      const stock = product.stock == null ? 99 : Number(product.stock);
      if (stock <= 0) { req.session.notice = "Este producto no tiene stock disponible."; return res.redirect(`/products/${id}`); }
      cart[id] = Math.min(desired, stock, 99);
      req.session.cart = cart;
      req.session.notice = cart[id] < desired
        ? "Agregamos el producto y ajustamos la cantidad al stock disponible."
        : `${product.name} se agregó al carrito.`;
      res.redirect("/cart");
    } catch (error) { next(error); }
  },
  update: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const quantity = Number.parseInt(req.body.quantity, 10);
      const cart = req.session.cart || {};
      if (!cart[id]) return res.redirect("/cart");
      if (!Number.isInteger(quantity) || quantity <= 0) {
        delete cart[id]; req.session.cart = cart; req.session.notice = "Producto eliminado del carrito.";
        return res.redirect("/cart");
      }
      const product = await Product.findByPk(id);
      if (!product) delete cart[id];
      else cart[id] = Math.min(quantity, product.stock == null ? 99 : Math.max(0, Number(product.stock)), 99);
      if (product && cart[id] === 0) delete cart[id];
      req.session.cart = cart;
      req.session.notice = "Actualizamos tu carrito.";
      res.redirect("/cart");
    } catch (error) { next(error); }
  },
  remove: (req, res) => {
    const cart = req.session.cart || {};
    delete cart[Number(req.params.id)];
    req.session.cart = cart;
    req.session.notice = "Producto eliminado del carrito.";
    res.redirect("/cart");
  }
};
export default cartController;