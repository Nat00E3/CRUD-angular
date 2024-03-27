import express from "express";
import * as CarroController from "../controllers/carro.js";

const router = express.Router();

router.get("/carros", CarroController.getCarros);
router.post("/carros", CarroController.addCarro);
router.put("/carros/:id", CarroController.updateCarro);
router.delete("/carros/:id", CarroController.deleteCarro);

export default router;
