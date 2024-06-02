const express = require('express');

const {addIncome,deleteIncome,getIncome} = require('../controllers/incomeController');

const requireAuth = require('../middleware/requireAuth');

const incomeRouter = express.Router();

//require auth for all
incomeRouter.use(requireAuth);

incomeRouter.post("/incomeadd", addIncome);

incomeRouter.get("/incomeget",getIncome)

// incomeRouter.get("/income/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await IncomeModel.findById(id);
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// incomeRouter.put("/incomeupdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { iamount, idescription } = req.body;

//     const updatedIncome = await IncomeModel.findByIdAndUpdate(
//       id,
//       { iamount, idescription },
//       { new: true }
//     );

//     res.json(updatedIncome);
//   } catch (err) {
//     res.json(err);
//   }
// });

incomeRouter.delete("/incomedel/:id", deleteIncome);


module.exports = incomeRouter;


