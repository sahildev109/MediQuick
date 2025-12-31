import Medicine from "../models/Medicine.model.js";

/**
 * ➕ Add new medicine
 */
export const addMedicine = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;

    // Validation
    if (!name || !price || !stock) {
      return res.status(400).json({
        message: "Name, price and stock are required",
      });
    }

    const medicine = await Medicine.create({
      name,
      price,
      stock,
      description
   
    });

    res.status(201).json({
      message: "Medicine added successfully",
      medicine,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 📦 Get all medicines
 */
export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(medicines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
