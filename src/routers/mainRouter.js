import express from "express"
import mainController from "../controllers/mainController.js"

const router = express.Router();

router.get('/' , mainController.index);
router.get('/register', mainController.register)
router.get('/login', mainController.login)
router.get('/products', mainController.products)
router.get('/search' , mainController.search)


export default router