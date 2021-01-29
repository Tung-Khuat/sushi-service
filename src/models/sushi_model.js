const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SushiSchema = new Schema({
    name: String,
    image: String,
    type: { type: String, default: "sushi" },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Sushi", SushiSchema)