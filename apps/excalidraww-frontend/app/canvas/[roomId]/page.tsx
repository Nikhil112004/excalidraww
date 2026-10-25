import { Suspense } from "react";
import { RoomCanvas } from "@/components/RoomCanvas";

type CanvasRoomPageProps = {
  params: Promise<{ roomId: string }>;
};

async function CanvasRoom({ params }: CanvasRoomPageProps) {
  const { roomId } = await params;

  return <RoomCanvas roomId={roomId} />;
}

export default function CanvasRoomPage(props: CanvasRoomPageProps) {
  return (
    <Suspense fallback={<div>Loading canvas...</div>}>
      <CanvasRoom {...props} />
    </Suspense>
  );
}
