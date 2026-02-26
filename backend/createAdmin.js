const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const username = process.argv[2] || "admin";
    const password = process.argv[3] || "admin123";

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log(`Admin with username "${username}" already exists.`);
      process.exit(0);
    }

    const admin = new Admin({ username, password });
    await admin.save();

    console.log("-----------------------------------");
    console.log("Admin account created successfully!");
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log("-----------------------------------");

    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
