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
  const [owner, setOwner] = useState<boolean>(false);
  const {id} = useParams<ParamsType>()
  const {name,setName} = useContext(NickNameContext)

  useEffect(() => {
    const isOwner = localStorage.getItem(id)
    if (isOwner) {
      setOwner(true)
    }
  },[id])

  const videoRef = useVideoPlayer(owner,id);
  const [show, setShow] = useState<Boolean>(true);
  if (!name) return <GetName/>
  return (
    <Flex maxH="fit-content" style={{ position: "relative" }}>
      <Box bgColor="black" flex={3}>
          <AspectRatio ratio={16 / 9}>
            <video
              id="videoElement"
              src="http://localhost:5000/video"
              controls={owner}
              ref={videoRef}
              autoPlay
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
        <Chat />
        <Button
          onClick={() => {
            setOwner(!owner);
          }}
        >
          {" "}
          {owner ? "Owner" : "Not Owner"}{" "}
        </Button>
      </Box>
    </Flex>
  );
};

export default Index;
