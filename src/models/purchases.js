const { mongoose } = require("../configs/dbConnection");

//satin alma

const purchasesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firms",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    //alis fiyati
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    //adet
    quantity: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      set: function () {
        return this.price * this.quantity;
      },
      //for
      default: function () {
        return this.price * this.quantity;
      },
      transform: function () {
        return this.price * this.quantity;
      },
    },
  },
  {
    collection: "purchases",
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchases", purchasesSchema);
