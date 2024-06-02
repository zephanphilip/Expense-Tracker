const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    iamount: {
         type: Number, required: true
        },
    idescription: {
         type: String, required: true
        },
    user_id: {
        type: String,
        required: true
    }
},{timestamps: true})



module.exports = mongoose.model("Incomes", IncomeSchema);
