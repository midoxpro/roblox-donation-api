const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/user/:userId/gamepasses", async (req, res) => {
  const userId = req.params.userId;

  try {
    const robloxApi =
      `https://games.roblox.com/v1/users/${userId}/game-passes?limit=50&sortOrder=Asc`;

    const response = await axios.get(robloxApi);

    const passes = response.data.data
      .filter(p => p.price && p.price > 0)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price
      }));

    res.json({ gamepasses: passes });
  } catch (err) {
    res.status(500).json({ error: "Roblox API failed" });
  }
});

app.listen(PORT, () => {
  console.log("API running");
});
