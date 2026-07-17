import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    name: String,
    quantity: String,
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    isVeg: {
      type: Boolean,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    ingredients: [ingredientSchema],

    servings: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;