const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    eamount: { type: Number, required: true},
    edescription: { type: String, required: true},
    user_id: {
        type: String,
        required: true
    }
},{timestamps: true})



module.exports = mongoose.model("Expenses", ExpenseSchema);
