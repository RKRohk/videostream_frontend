import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Popover, PopoverTrigger } from "@chakra-ui/popover";
import { Slide, SlideFade } from "@chakra-ui/transition";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NickNameContext } from "../context/namecontext";
import {CSSTransition } from 'react-transition-group'
import BG from "../pages/home_bg.jpg";
import { useHistory } from "react-router";
import axios from "axios";
import { Select } from "@chakra-ui/select";
import { SERVER_URL } from "../constants";


const Home = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("");
  const { name, setName } = useContext(NickNameContext);

  const { isOpen, onToggle } = useDisclosure();
  const history = useHistory()

  //videos is list of videos from server
  const [videos,setVideos] = useState<string[]>([])
  const [video,setVideo] = useState<string>()

  const getVideos = async () => {
    try{
      const response = await axios.get(`${SERVER_URL}/videos`)
      const videosFromServer = response.data
      console.log(response.data)
      setVideos(videosFromServer)
    }
    catch(e){
      console.error(e)
    }
  }

  useEffect(() => {
    getVideos()
  },[])

  useLayoutEffect(() => {
    onToggle();
  }, []);

  return (
    <Flex
      style={{ height: "100vh" }}
      w="full"
      backgroundImage={BG}
      backgroundSize="contain"
      alignItems="center"
    >
    <Box
        w="min"
        mx="auto"
        bgColor="white"
        my="auto"
        p="8"
        borderRadius="xl"
        opacity="0.98"
      >
        <form
          onSubmit={ async (e) => {
            e.preventDefault();

            try {
              const response = await axios.post(`${SERVER_URL}/room`,{video})
              const {room} = response.data
              console.log(response.data)
              setUrl(`${process.env.PUBLIC_URL}:3000/room/${room.name}`);
              localStorage.setItem(room.name, "true");
              history.push(`/room/${room.name}`)
            }
            catch(e){
              console.error(e)
            }

            
          }}
        >
          <FormControl id="room name">
            <FormLabel>Select video</FormLabel>
            <Select value={video} placeholder={"Select video"} onChange={e => setVideo(e.target.value)}>
              {videos.map((v,i) => {
                return <option value={v} key={`movie-option-${i}`}>{v}</option>
              })}
            </Select>
          </FormControl>
          <FormControl id="username">
            <FormLabel>Nickname</FormLabel>
            <Input
              minW="xl"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <Box>
            <Button mx="auto" type="submit">
              {" "}
              Create Room{" "}
            </Button>
          </Box>
        </form>
        <Input
          id="room_link"
          value={url}
          contentEditable="false"
          variant="unstyled"
          isReadOnly={true}
        />
      </Box>      
    </Flex>
  );
};

export default Home;
