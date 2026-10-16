import express from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";
import {createUserSchema, signInSchema, createRoomSchema} from "@repo/common/config";
import { middleware } from "./middleware.js";

const app = express();

app.post("signup", async(req, res) => {
    const data = createUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }

res.send("user signed up")
})

app.post("signin", async(req, res) => {
    const data = signInSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }
     const userId = 1;

     const token = jwt.sign({userId}, JWT_SECRET);

     res.json({
        token
     })

})

app.post("create-room", middleware, async(req, res) => {
const data = createRoomSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Incorrect inputs"
        })
    }
})

app.listen(3001);

