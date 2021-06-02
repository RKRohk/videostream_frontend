import { Button } from "@chakra-ui/button";
import {ArrowRightIcon,ArrowLeftIcon} from "@chakra-ui/icons";
import { AspectRatio, Box, Flex } from "@chakra-ui/layout";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Chat from "../components/Chat";
import { NickNameContext } from "../context/namecontext";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import GetName from "./GetName";
interface ParamsType {
  id: string;
}

const Index: React.FC = (props) => {
  const { id } = useParams<ParamsType>();
  const [owner, setOwner] = useState<boolean>(false);
  console.log("is I owner?", owner);
  const { name } = useContext(NickNameContext);

  const { videoRef, socket } = useVideoPlayer(owner, id);
  const [show, setShow] = useState<Boolean>(true);

  useEffect(() => {
    console.log("useeffect owner", owner);
    const isOwner = localStorage.getItem(id);
    if (isOwner) {
      setOwner(true);
    }
  });

  if (!name) return <GetName />;

  return (
    <Flex bgColor="black" style={{ height: "100vh", position: "relative" }}>
      <Box my="auto" bgColor="black" flex={3}>
        <Box w="full" bgColor="blue">
          <AspectRatio ratio={16 / 9}>
            <video
              id="videoElement"
              src={`${"http://152.67.11.148:5000"}/video`}
              controls={owner}
              ref={videoRef}
              muted={false}
              playsInline
            />
          </AspectRatio>
        </Box>
      </Box>
      <Box position="relative">
        <Button
          onClick={() => setShow(!show)}
          style={{top:"50%", position: "absolute", right: "59%" }}
        >
          {show ? <ArrowRightIcon/> : <ArrowLeftIcon/>}
        </Button>
      </Box>
      <Box bgColor="facebook.800" flex={1} hidden={!show}>
        {id}
        <Chat socket={socket} />
      </Box>
    </Flex>
  );
};

export default Index;
