const express = require("express");
const db = require("../../database/connection");

const stateTaxRouter = express.Router();

stateTaxRouter.get("/states", async (req, res) => {
  try {
    const states = await db.state_tax.findMany();
    res.json(states);
  } catch (e) {
    res.status(500).send(`error [/api/states] : ${e}`);
  }
});


stateTaxRouter.get("/statetax/:state_abbr", async (req, res) => {
  try {
    const stateAbbr = req.params.state_abbr;
    const stateTax = await db.state_tax.findUnique({
      where: { state_abbr: stateAbbr },
    });
    res.json(stateTax);
  } catch (e) {
    res.status().send(`error [/statetax/:state_abbr] : ${e}`);
  }
});

module.exports = stateTaxRouter;
