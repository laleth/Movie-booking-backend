const mongoose = require("mongoose")

const moviesSchema = mongoose.Schema(
    {
        id:{ type: String, required: true },
        name: { type: String, required: true },
        poster:{ type: String, required: true },
        rating: { type: Number, required: true },
        trailer: { type: String, required: true },
        summary: { type: String, required: true },
        language:{ type: String, required: true },
    },
    { timestamps: true }
)

const moviesModel = mongoose.model("movies", moviesSchema)

module.exports = moviesModel
