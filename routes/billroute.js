const express = require("express")
const billModel = require("../models/billmodel")
const authUser = require("../middleware/auth");


const router = express.Router()
router.use(authUser);

router.post("/charge-bill", async (req, res) => {
    try {
        const newBill = new billModel(req.body)
        await newBill.save()
        res.send("Bill saved successfully")
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/get-bill", async (req, res) => {
    try {
        const bills = await billModel.find()
        res.send(bills)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/delete-bills", async (req, res) => {
    try {
        await billModel.deleteMany({});
        res.send("All bills deleted successfully");
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports=router