import { useLayoutEffect, useRef } from "react";
import { socket } from "../webhooks";

let lock = false;
function unlock() {
  setTimeout(() => {
    lock = false;
  }, 500);
}
export const useVideoPlayer = (owner: Boolean) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (owner) {
      videoRef.current?.addEventListener("pause", (event) => {
        if (lock) return;
        const s = socket.emit("pause");
        console.log(s);
      });

      videoRef.current?.addEventListener("play", (event) => {
        if (lock) return;
        const s = socket.emit("play");
        console.log("played")
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
      unlock();
    });

    socket.on("play", () => {
      console.log("got play");
      videoRef.current?.play();
      unlock();
    });

    socket.on("seeked", (args) => {
      const { timestamp } = args;
      const videoPlayer = document.getElementById("videoElement") as any;
      videoPlayer.currentTime = timestamp;
      unlock();
    });
  }, [owner]);

  return videoRef;
};
