const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
},
{ timestamps: true }
);

const profilemodel = mongoose.model("Profile", profileSchema);

module.exports = profilemodel;
