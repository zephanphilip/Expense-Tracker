const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const UserModel = require('../models/Users.js');
const {loginUser,signupUser} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post("/register", signupUser);

userRouter.post("/login", loginUser);

// userRouter.get("/profile", async (req, res) => {
//   try {
//       const response = await UserModel.find({})
//       res.json(response);
//   } catch(err){
//       res.json(err);
//   }
// })

// userRouter.put("/profileupdate/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, place, age, education, email, phoneno } = req.body;

//     const updatedProfile = await UserModel.findByIdAndUpdate(
//       id,
//       { name, place, age, education, email, phoneno },
//       { new: true }
//     );

//     res.json(updatedProfile);
//   } catch (err) {
//     res.json(err);
//   }
// });
// userRouter.put("/profileblock/:id", async (req, res) => {
//   try {
//   const { id }= req.params;
//   const blockedProfile=await UserModel.findByIdAndUpdate(id, { block: true }, { new: true });
//   res.json(blockedProfile);
//   } catch (err) {
//     res.json(err);
//   }
// });
// userRouter.put("/profileunblock/:id", async (req, res) => {
//   try {
//   const { id }= req.params;
//   const unblockedProfile=await UserModel.findByIdAndUpdate(id, { block: false }, { new: true });
//   res.json(unblockedProfile);
//   } catch (err) {
//     res.json(err);
//   }
// });

// userRouter.delete("/profile/:id", (req, res) => {
//   const { id } = req.params;
//   UserModel.findOneAndDelete({ _id: id })
//     .then(deletedUser => {
//       if (deletedUser) {
//         res.json({ message: "User deleted successfully" });
//       } else {
//         res.json({ message: "User not found" });
//       }
//     })
//     .catch(err => res.json(err));
// });

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     jwt.verify(authHeader, "secret", (err) => {
//       if (err) {
//         return res.sendStatus(403);
//       }
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
// module.exports.verifyToken = verifyToken;

module.exports = userRouter;

// userRouter.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }
//   const token = jwt.sign({ id: user._id }, "secret");
//   res.json({ token, userID: user._id,block: user.block });
// });