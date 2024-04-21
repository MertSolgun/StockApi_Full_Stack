const { mongoose } = require("../configs/dbConnection");

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      set: (name) => name.toUpperCase(),
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

module.exports = mongoose.model("Categories", categoriesSchema);
