import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Recipe from "./models/Recipe.js";
import { menuData } from "../src/data/menuData.js";

dotenv.config();

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing recipes
    await Recipe.deleteMany({});
    console.log("Existing recipes cleared.");

    // Insert new recipes
    await Recipe.insertMany(menuData);
    console.log(`${menuData.length} recipes seeded successfully!`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
