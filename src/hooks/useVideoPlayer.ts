import { useLayoutEffect, useRef } from "react";
import { io } from "socket.io-client";

let lock = false;
function unlock() {
  setTimeout(() => {
    lock = false;
  }, 500);
}
export const useVideoPlayer = (owner: boolean, id: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const socket = io("http://localhost:5000", {
    reconnectionDelayMax: 10000,
    query:{
      room:id
    }
  });
  socket.connect()

  useLayoutEffect(() => {
    if (owner) {
      videoRef.current?.addEventListener("pause", (event) => {
        socket.emit("pause");
        console.log("paused");
      });

      videoRef.current?.addEventListener("play", (event) => {
        const s = socket.emit("play");
        console.log("played");
      });

      videoRef.current?.addEventListener("seeked", (event) => {
        if (lock) return;
        const videoPlayer = document.getElementById("videoElement") as any;
        const currentTime = videoPlayer.currentTime;
        socket.emit("seeked", { timestamp: currentTime });
      });
    }
    socket.onAny(() => {
      // lock = true
      // console.log("lock")
    });

    socket.on("pause", () => {
      console.log("got pause");
      videoRef.current?.pause();
      console.log();
    });

    socket.on("play", () => {
      console.log("got play");
      videoRef.current?.play();
    });

    socket.on("seeked", (args) => {
      const { timestamp } = args;
      const videoPlayer = document.getElementById("videoElement") as any;
      videoPlayer.currentTime = timestamp;
      unlock();
    });

    return () => {
      socket.disconnect()
    }
  }, [owner]);

  return videoRef;
};
