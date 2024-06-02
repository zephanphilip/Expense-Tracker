require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");




const app = express();

app.use(express.json());
app.use(cors());

//middleware
app.use(express.json())
app.use((req, res, next)=>{
    console.log(req.path,req.method);
    next();
})

// Routes
const userRouter = require("./routes/users.js");
const incomeRouter = require("./routes/income.js");
const expenseRouter = require("./routes/expense.js");

app.use("/api/auth", userRouter);
app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);

// // Serve static files
// app.use(express.static(path.join(__dirname, '../build')));

// app.get('/*', function(req, res) { 
//     res.sendFile(path.join(__dirname, '../build', 'index.html')); 
// });




// Connect to MongoDB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    // Start the server
    app.listen(process.env.PORT, () => console.log('Server listening on port 3001 & connected to db'));
  })
  .catch(error => {
    console.error('Failed to connect to MongoDB:', error);
  });


