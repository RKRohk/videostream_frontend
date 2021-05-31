import { Button } from "@chakra-ui/button";
import { AspectRatio, Box, Flex } from "@chakra-ui/layout";
import { useContext, useEffect,  useState } from "react";
import { useParams } from "react-router";
import Chat from "../components/Chat";
import { NickNameContext } from "../context/namecontext";
import { useVideoPlayer } from "../hooks/useVideoPlayer";
import GetName from "./GetName";
interface ParamsType {
  id:string
}

const Index: React.FC = props => {
  const {id} = useParams<ParamsType>()
  const [owner, setOwner] = useState<boolean>(false);
  console.log("is I owner?",owner)
  const {name,setName} = useContext(NickNameContext)


  const {videoRef,socket} = useVideoPlayer(owner,id);
  const [show, setShow] = useState<Boolean>(true);

  useEffect(() => {
    console.log("useeffect owner", owner)
    const isOwner =  localStorage.getItem(id) 
    if (isOwner) {
      setOwner(true)
    }
  })

  if (!name) return <GetName/>

  return (
    <Flex maxH="full" style={{ position: "relative" }}>
      <Box bgColor="black" flex={3}>
          <AspectRatio ratio={16 / 9}>
            <video
              id="videoElement"
              src="/video"
              controls={owner}
              ref={videoRef}
              muted={false}
            />
          </AspectRatio>
      </Box>
      <div style={{ position: "relative" }}>
        <Button
          onClick={() => setShow(!show)}
          style={{ position: "absolute", right: "59%" }}
        >
          Show/Hide
        </Button>
      </div>
      <Box flex={1} hidden={!show}>
        {id}
        <Chat socket={socket}/>
      </Box>
    </Flex>
  );
};

export default Index;
