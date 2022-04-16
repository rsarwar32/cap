const express = require("express");
const customerRouter = require("./customer");
const stateTaxRouter = require("./state_tax");
const productRouter = require("./product");
const locationsRouter = require("./location");
const eventRouter = require("./event");
const userRouter = require("./user");
const supplyRouter = require("./suppliers");
const materialRouter = require("./material");
const authRouter = require("./auth");

const apiRouter = express.Router();

const protectedApiPaths = [
  authRouter,
  customerRouter, 
  stateTaxRouter,
  productRouter,
  eventRouter,
  userRouter,
  supplyRouter,
  materialRouter,
  locationsRouter
];

apiRouter.use("/api", protectedApiPaths);
// apiRouter.use("/api/auth", authPaths)

module.exports = apiRouter;
