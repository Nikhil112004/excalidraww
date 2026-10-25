import { createServer } from "node:http";
import { WebSocket, WebSocketServer } from 'ws';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";

const server = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});
const wss = new WebSocketServer({ server });

interface User {
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch(e) {
    return null;
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close(4401, "Unauthorized");
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);
      const roomId = String(parsedData.roomId);
      if (user && !user.rooms.includes(roomId)) {
        user.rooms.push(roomId);
      }
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }
      const roomId = String(parsedData.roomId ?? parsedData.room);
      user.rooms = user.rooms.filter(x => x !== roomId);
    }

    if (parsedData.type === "chat") {
      const roomId = String(parsedData.roomId);
      const message = parsedData.message;

      try {
        await prismaClient.chat.create({
          data: {
            roomId: Number(roomId),
            message,
            userId
          }
        });
      } catch (error) {
        console.error(`Failed to save chat for room ${roomId}`, error);
        return;
      }

      users.forEach(user => {
        if (user.rooms.includes(roomId) && user.ws.readyState === WebSocket.OPEN) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }));
        }
      });
    }

  });

  ws.on("close", () => {
    const userIndex = users.findIndex(user => user.ws === ws);
    if (userIndex !== -1) users.splice(userIndex, 1);
  });

});

const port = Number(process.env.PORT) || 8080;
server.listen(port, "0.0.0.0");
