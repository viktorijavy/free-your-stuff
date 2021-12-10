const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    description: String
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;