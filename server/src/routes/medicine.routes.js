import express from "express";
import {
  addMedicine,
  getAllMedicines,
} from "../controllers/medicine.controller.js";

const router = express.Router();

router.post("/", addMedicine);     // add medicine
router.get("/", getAllMedicines);  // list medicines

export default router;
