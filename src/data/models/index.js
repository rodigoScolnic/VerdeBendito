import Product from "./Product.js";
import Category from "./Category.js";
import User from './User.js'

// 🧠 Creamos el objeto que va a contener todos los modelos
const db = {
  User,
  Product,
  Category
};

// ⚙️ Ejecutamos las asociaciones (belongsTo, hasMany, etc.)
Object.keys(db).forEach(modelName => {
  const model = db[modelName];
  if (model.associate) {
    model.associate(db);
  }
});

export default db;