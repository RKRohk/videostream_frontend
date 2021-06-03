import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { io } from "socket.io-client";
import { NickNameContext } from "../context/namecontext";
import { ActionTypes, Message } from "../reducers/messageReducer";
type ArgType = { timestamp?: Number };

let lock = false;
function unlock() {
  setTimeout(() => {
    lock = false;
  }, 500);
}



export const useVideoPlayer = (owner: boolean|null, id: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {name} = useContext(NickNameContext)
  const socket = io("http://152.67.11.148:5000", {
    reconnectionDelayMax: 10000,
    query: {
      room: id,
      name: name
    },
  });
  socket.connect();
  useLayoutEffect(() => {
    console.log("in effect",owner)
    if (owner === true) {
      videoRef.current?.addEventListener("pause", (event) => {
        const videoPlayer = document.getElementById("videoElement") as any;
        const currentTime = videoPlayer.currentTime;
        socket.emit("pause", { timestamp: currentTime });

        const message:Message = {by:name,message:`${name} paused the video`,type:ActionTypes.ACTION}
        socket.emit("message",message)
        console.log("paused");
      });

      videoRef.current?.addEventListener("play", (event) => {
        const videoPlayer = document.getElementById("videoElement") as any;
        const currentTime = videoPlayer.currentTime;
        const s = socket.emit("play", { timestamp: currentTime });

        const message:Message = {by:name,message:`${name} played the video`,type:ActionTypes.ACTION}
        socket.emit("message",message)

        console.log("played");
      });

      videoRef.current?.addEventListener("seeked", (event) => {
        if (lock) return;
        const videoPlayer = document.getElementById("videoElement") as any;
        const currentTime = videoPlayer.currentTime;
        socket.emit("seeked", { timestamp: currentTime });

        const message:Message = {by:name,message:`${name} seeked the video`,type:ActionTypes.ACTION}
        socket.emit("message",message)
      });
    }
    socket.onAny(() => {
      // lock = true
      // console.log("lock")
    });

    socket.on("pause", (args: ArgType) => {
      console.log("got pause");
      const { timestamp } = args;
      const videoPlayer = document.getElementById("videoElement") as any;

      videoPlayer.currentTime = timestamp;
      videoRef.current?.pause();
      console.log();
    });

    socket.on("play", (args: ArgType) => {
      console.log("got play");
      const { timestamp } = args;
      const videoPlayer = document.getElementById("videoElement") as any;

      videoPlayer.currentTime = timestamp;
      videoRef.current?.play();
    });

    socket.on("seeked", (args: ArgType) => {
      const { timestamp } = args;
      const videoPlayer = document.getElementById("videoElement") as any;
      videoPlayer.currentTime = timestamp;
      unlock();
    });

    return () => {
      socket.disconnect();
    };
  });

  return {videoRef,socket};
};
