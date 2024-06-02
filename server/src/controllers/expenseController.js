const Expenses = require('../models/Expense')
const mongoose = require('mongoose')


//get all expense
const getExpense = async (req, res) =>{
    const user_id = req.user._id
    const expense = await Expenses.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(expense)
}


//post an expense
const addExpense = async (req, res) => {
    const {eamount,edescription} = req.body
    try {
        const user_id = req.user._id
        const expense = await Expenses.create({eamount, edescription, user_id})
        res.status(200).json(expense)
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  

// delete a expense
 const deleteExpense= (req, res) => {
    const { id } = req.params;
    Expenses.findOneAndDelete({ _id: id })
      .then(deletedExpense => {
        if (deletedExpense) {
          res.json({ message: "Expense deleted successfully" });
        } else {
          res.json({ message: "Expense not found" });
        }
      })
      .catch(err => res.json(err));
  }

module.exports = { getExpense, addExpense, deleteExpense}