const { mongoose } = require("../configs/dbConnection");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
  },
  {
    collection: "token",
    timestamps: true,
  }
);

module.exports = mongoose.model("Token", tokenSchema);
