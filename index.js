const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json({status: true, message: "You are reach our server"})
})


//Routers Define here

const UserRouter = require('./app/routes/user.route');
app.use('/user', UserRouter);

mongoose.connect(
    `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.wcopk.mongodb.net/${process.env.DATABASE_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error"));
  db.once("open", async () => {
    console.log("Mongo: successfully connected to db");
  });

  app.listen(process.env.PORT, () => {
    console.log("Magic happens on port: " + process.env.PORT);
  });
