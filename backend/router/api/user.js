const express = require("express");
const db = require("../../database/connection");

const userRouter = express.Router();

userRouter.get("/alluser", async (req, res) => {
    try {
      const users = await db.user.findMany();
      res.json(users);
    } catch (e) {
      res.status(500).send(`error [/api/user] : ${e}`);
    }
  });

  //host.com/api/newuser -- this will create a new user
  userRouter.post('/user', async (req,res) => {  
    try {
        const {user_id, user_name, user_pass} = req.body
        const newuser = await db.user.create({
            data: {
                user_id,
                user_name,
                user_pass
            },
        })
        res.json(newuser)


      } catch (e) {
        
        res.status(500).send('error')
      }
  });

  module.exports = userRouter
  