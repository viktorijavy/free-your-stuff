const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const itemSchema = new Schema(
  {
    title: {
        type: String,
        required: true,
    },
    

    description: {
      type: String,
      required: true
    },

    address: {
        type: String,
        required: true
    },

    imageUrl: {
        type:  String,
        required: true
      },

  }
);

const Item = model("Item", itemSchema);

module.exports = Item;