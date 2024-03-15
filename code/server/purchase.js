// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 5000;
const app = express();
const cors = require("cors");
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Purchase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema
const purchaseSchema = new mongoose.Schema({
  // linkToPurchase: String,
  // componentName: String,
  // quantity: Number,
  // chimsFile: String,
  // poBomQuoteFile: String,
  // team: String,
  // project: String,
  componentName: String,
  quantity: Number,
  team: String,
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

app.use(bodyParser.json());
app.use(cors());
// Handle form submission
app.post("/purchase", async (req, res) => {
  try {
    const purchase = new Purchase(req.body);
    await purchase.save();
    res.status(201).send(purchase);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.get("/purchase", async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
