const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    color: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },

    productImage: {
      type: String,
    },
    category: {
      type: String,
    },
    availableSizes: {
      type: Array,
      trim: true,
    },
    totalQuantity: {
      type: String,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    productImage: {
      type: String,
      default: false,
    },
    featherImages: [String]
  },
  { timestamps: true }
);

module.exports = new mongoose.model("product_detail", productSchema);
