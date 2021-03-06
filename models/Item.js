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
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    post: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  }
);

const Item = model("Item", itemSchema);

module.exports = Item;