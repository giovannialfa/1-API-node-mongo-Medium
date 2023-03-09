const express = require("express");
const bodyParser = require("body-parser");
const User = require("./user");

const app = express();
const mongoose = require("mongoose");
/*

tes
sadsaf fadf
asd 
*/

mongoose
  .connect("mongodb://0.0.0.0:27017/user-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route untuk membuat pengguna baru
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// route untuk mendapatkan daftar semua pengguna
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// route untuk mendapatkan pengguna berdasarkan ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

// route untuk memperbarui pengguna berdasarkan ID
app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// route untuk menghapus pengguna berdasarkan ID
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// memulai server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
