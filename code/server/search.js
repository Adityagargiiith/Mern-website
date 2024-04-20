// server.js
const express = require("express");
const axios = require("axios");

const app = express();

app.get("/amazon-search", async (req, res) => {
  const searchTerm = req.query.k;
  try {
    const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching Amazon search results:", error);
    res.status(500).send("Error fetching Amazon search results");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
