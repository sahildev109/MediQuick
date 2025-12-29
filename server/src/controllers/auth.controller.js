import bcrypt from "bcrypt";
import User from "../models/User.model.js";



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Respond (NO JWT YET)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        gender:user.gender,
        address:user.address,
        email: user.email,
        phone:user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const signup = async (req, res) => {
  try {
    const {
      name,
      gender,
      phone,
      address,
      email,
      password,
      confirmPassword,
      role,
    } = req.body;

    // 1️⃣ Validate input
    if (
      !name ||
      !gender ||
      !phone ||
      !address ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    console.log('hello')

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const user = await User.create({
      name,
      gender,
      phone,
      address,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    // 5️⃣ Send response (no JWT yet)
    res.status(201).json({
      message: "User registered successfully",
      user: {
         id: user._id,
        name: user.name,
        gender:user.gender,
        address:user.address,
        email: user.email,
        phone:user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
