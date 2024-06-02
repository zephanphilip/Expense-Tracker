const Incomes = require('../models/Income')
const mongoose = require('mongoose')


//get all income
const getIncome = async (req, res) =>{
    const user_id = req.user._id
    const income = await Incomes.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(income)
}


//post a income
const addIncome = async (req, res) => {
    const {iamount,idescription} = req.body
    try {
        const user_id = req.user._id
        const income = await Incomes.create({iamount, idescription, user_id})
        res.status(200).json(income)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


// delete a income
 const deleteIncome= (req, res) => {
    const { id } = req.params;
    Incomes.findOneAndDelete({ _id: id })
      .then(deletedIncome => {
        if (deletedIncome) {
          res.json({ message: "Income deleted successfully" });
        } else {
          res.json({ message: "Income not found" });
        }
      })
      .catch(err => res.json(err));
  }

module.exports = { getIncome, addIncome, deleteIncome}