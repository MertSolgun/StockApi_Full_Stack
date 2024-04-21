const { mongoose } = require("../configs/dbConnection");

const productsSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
    name: { type: String, trim: true, required: true },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    //depo stok adeti
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);
module.exports = mongoose.model("Products", productsSchema);
