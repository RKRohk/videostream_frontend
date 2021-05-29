import { Button } from "@chakra-ui/button";
import { AspectRatio, Box, Container, Flex } from "@chakra-ui/layout";
import { useLayoutEffect, useRef, useState } from "react";
import Chat from "../components/Chat";
import { useVideoPlayer } from "../hooks/useVideoPlayer";

const Index: React.FC = () => {
  const [owner,setOwner] = useState<Boolean>(false)
  const videoRef = useVideoPlayer(owner)
  const [show,setShow] = useState<Boolean>(true);

  return (
    <Flex maxH="fit-content" style={{ position: "relative" }}>
      <Box flex={3}>
        <video
          id="videoElement"
          loop
          autoPlay
          controls
          src="http://localhost:5000/video"
          ref={videoRef}
        />
      </Box>
      <div style={{position:"relative"}}>
      <Button onClick={() => setShow(!show)} style={{ position: "absolute", right: "59%" }  }>Show/Hide</Button>
      </div>
      <Box flex={1} hidden={!show}>
        <Chat/>
        <Button onClick={() => {setOwner(!owner)}}> {  owner ? "Owner" : "Not Owner"} </Button> 
      </Box>
    </Flex>
  );
};

export default Index;
