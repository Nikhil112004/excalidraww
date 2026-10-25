"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    useEffect(() => {
        setSocket(null);
        setConnectionError(null);
        let active = true;
        let ws: WebSocket | null = null;

        // Deferring avoids opening a socket for React Strict Mode's
        // development-only setup/cleanup pass.
        const connectTimer = window.setTimeout(() => {
            if (!active) return;

            const token = window.localStorage.getItem("token");
            if (!token) {
                setConnectionError("Sign in first, then open this room again.");
                return;
            }

            ws = new WebSocket(`${WS_URL}?token=${encodeURIComponent(token)}`);

            ws.onopen = () => {
                if (!active) {
                    ws?.close();
                    return;
                }

                ws?.send(JSON.stringify({
                    type: "join_room",
                    roomId
                }));
                setSocket(ws);
            };

            ws.onerror = (event) => {
                if (active) {
                    console.error("WebSocket connection failed", event);
                    setConnectionError("Could not connect to the realtime server. Please try again.");
                }
            };

            ws.onclose = (event) => {
                if (!active) return;
                setSocket(null);
                const reason = event.code === 4401
                    ? "Your sign-in token is invalid. Sign in again."
                    : `WebSocket closed (code ${event.code}).`;
                setConnectionError(reason);
            };
        }, 0);

        return () => {
            active = false;
            window.clearTimeout(connectTimer);

            // Let an in-flight handshake finish; ws.onopen closes it if this
            // effect has already been cleaned up.
            if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: "leave_room", roomId }));
                ws.close();
            }
        };
    }, [roomId]);
   
    if (!socket) {
        return <div role="status">
            {connectionError ?? "Connecting to server..."}
            {connectionError?.startsWith("Sign in first") && (
                <p><a className="underline" href="/signin">Sign in</a> to continue.</p>
            )}
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}
