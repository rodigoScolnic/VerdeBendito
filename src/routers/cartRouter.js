import express from "express";
import cartController from "../controllers/cartController.js";
const router = express.Router();
router.get("/cart", cartController.index);
router.post("/cart/:id/add", cartController.add);
router.post("/cart/:id/update", cartController.update);
router.post("/cart/:id/remove", cartController.remove);
export default router;