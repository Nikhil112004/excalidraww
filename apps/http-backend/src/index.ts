import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/config";
import { middleware } from "./middleware.js";
import { prismaClient } from "@repo/db/client";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || true }));

app.get("/health", (_req, res) => {
    res.status(200).send("ok");
});

app.post("/signup", async (req, res) => {
    const parsedData = createUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        })
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })

    } catch (error) {
        return res.status(411).json({
            message: "User already exists eith this username"
        })
    }
});

app.post("/signin", async (req, res) => {
    const parsedData = signInSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
            password: parsedData.data.password
        }
    })

    if (!user) {
        return res.status(403).json({
            message: "Not authorized"
        })
    }

    const token = jwt.sign({
        userId: user?.id
    }, JWT_SECRET);

    res.json({
        token
    })

})

app.post("/room", middleware, async (req, res) => {
    const parsedData = createRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    //@ts-ignore
    const userId = req.userId;
    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.roomName,
                adminId: userId
            }
        })
        res.json({
            roomId: room.id
        })
    } catch (e) {
        res.status(411).json({
            message: "Room already exists this name"
        })
    }
})

app.get("/chats/:roomId", async (req, res) =>  {

    try{
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId:  roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });
        res.json({
            messages
        })
    } catch (e){
        console.log(e);
        res.json({
            messages:[]
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    try{
        const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        }
    })
    res.json({
        room
    })
    }catch(err){
        res.status(411).json({
            message: "room not exists"
        })
    }
})


const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0");

