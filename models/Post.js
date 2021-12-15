const { Schema, model } = require("mongoose")

const postSchema = new Schema(
    {
        poster: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        item: {
            type: Schema.Types.ObjectId,
            ref: "Item",
        },

        message: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
)

const Post = model("Post", postSchema)

module.exports = Post