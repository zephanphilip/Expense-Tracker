const express = require('express');
const { addExpense,deleteExpense,getExpense } = require('../controllers');

const requireAuth = require('../middleware/requireAuth');

const expenseRouter = express.Router();

//require auth for all
expenseRouter.use(requireAuth);

expenseRouter.post("/expenseadd", addExpense);

expenseRouter.get("/expenseget", getExpense);

expenseRouter.delete("/expensedel/:id",deleteExpense);

// expenseRouter.get("/expense/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await ExpenseModel.findById(id);
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// expenseRouter.put("/expenseupdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { eamount, edescription } = req.body;

//     const updatedExpense = await ExpenseModel.findByIdAndUpdate(
//       id,
//       { eamount, edescription },
//       { new: true }
//     );

//     res.json(updatedExpense);
//   } catch (err) {
//     res.json(err);
//   }
// });



module.exports = expenseRouter;


