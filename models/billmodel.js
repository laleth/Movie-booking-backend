const mongoose = require("mongoose")

const billSchema = mongoose.Schema(
    {
        customerName: { type: String, required: true },
        customerPhoneNumber: { type: Number, required: true },
        totalSeats:{type:Number,required:true},
        totalAmount: { type: Number, required: true },
        tax: { type: Number, required: true },
        subTotal: { type: Number, required: true },
        paymentMode: { type: String, required: true },
    },
    { timestamps: true }
)

const billModel = mongoose.model("bills", billSchema)

module.exports = billModel