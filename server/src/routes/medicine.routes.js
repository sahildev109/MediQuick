import express from "express";
import upload from "../middlewares/multer.js";
import {
  addMedicine,
  getAllMedicines,
} from "../controllers/medicine.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), addMedicine);   // add medicine
router.get("/", getAllMedicines);  // list medicines

export default router;
