import express from "express";
import session from "express-session";
import methodOverride from "method-override";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./src/data/config.js";
import userLoggedMiddleware from "./src/middleware/userLogged.js";
import mainRouter from "./src/routers/mainRouter.js";
import userRouter from "./src/routers/userRouter.js";
import cartRouter from "./src/routers/cartRouter.js";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const production = process.env.NODE_ENV === "production";
if (production) app.set("trust proxy", 1);

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "public")));

if (production && !process.env.SESSION_SECRET) {
  throw new Error("Configurá SESSION_SECRET en las variables de entorno.");
}
app.use(session({
  name: "verde.sid",
  secret: process.env.SESSION_SECRET || "clave-solo-para-desarrollo",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: "lax", secure: production, maxAge: 86400000 }
}));

app.use(userLoggedMiddleware);
app.use("/", mainRouter);
app.use("/", userRouter);
app.use("/", cartRouter);

app.use((req, res) => res.status(404).render("error", {
  title: "Página no encontrada",
  message: "No encontramos lo que estás buscando."
}));
app.use((err, req, res, next) => {
  console.error("Error de aplicación:", err);
  if (res.headersSent) return next(err);
  res.status(500).render("error", {
    title: "Tuvimos un inconveniente",
    message: "No pudimos completar tu solicitud. Intentá nuevamente."
  });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => console.log(`VerdeBendito escuchando en el puerto ${port}`));
  } catch (error) {
    console.error("No se pudo iniciar la aplicación:", error);
    process.exit(1);
  }
};
start();
export default app;