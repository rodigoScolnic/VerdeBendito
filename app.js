import express from "express";
import sequelize from "./src/data/config.js"
import dotenv from "dotenv"
import methodOverride from "method-override"
import { fileURLToPath } from "url"
import path from "path"
import session from 'express-session'
import bcrypt from 'bcrypt'

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'src/views'))

app.use(express.static(path.join(__dirname , 'public')))

app.use(session({
  secret: 'clave-super-secreta',   
  resave: false,                   
  saveUninitialized: false,        
  cookie: { 
    maxAge: 1000 * 60 * 60,       
    secure: false               
  }
}));

import userLoggedMiddleware from './src/middleware/userLogged.js'

app.use(userLoggedMiddleware);


import mainRouter from "./src/routers/mainRouter.js"
import userRouter from "./src/routers/userRouter.js"

app.use('/', mainRouter)
app.use('/', userRouter)

/* crear una contraseña hasheada 

const password = "admin";
const saltRounds = 10;

const hashedPassword = await bcrypt.hash(password, saltRounds);
console.log(hashedPassword);

-- cambiar 'admin' por lo que se desee (solo para administrador) */

sequelize
    .sync({ alter: true })
    .then(() => console.log("✅ Base de datos sincronizada"))
    .catch(err => console.error("❌ Error al sincronizar DB:", err));

app.listen( process.env.PORT , ()=> {
    console.log(`servidor escuchando en el puerto ${process.env.PORT}`)
})

