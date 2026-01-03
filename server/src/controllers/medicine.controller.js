import cloudinary from "../config/cloudinary.js";
import Medicine from "../models/Medicine.model.js";

/**
 * ➕ Add new medicine
 */
export const addMedicine = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !price || !stock || !req.file) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "medicines" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    const medicine = await Medicine.create({
      name,
      description,
      price,
      stock,
      image: uploadResult.secure_url,
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
