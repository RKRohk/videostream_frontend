import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Popover, PopoverTrigger } from "@chakra-ui/popover";
import { Slide, SlideFade } from "@chakra-ui/transition";
import { useContext, useLayoutEffect, useRef, useState } from "react";
import { NickNameContext } from "../context/namecontext";
import {CSSTransition } from 'react-transition-group'
import BG from "../pages/home_bg.jpg";
import { useHistory } from "react-router";


const Home = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [roomname, setRoomName] = useState("");
  const [nickname, setNickname] = useState("");
  const [url, setUrl] = useState("");
  const { setName } = useContext(NickNameContext);

  const { isOpen, onToggle } = useDisclosure();
  const history = useHistory()
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
          onSubmit={(e) => {
            e.preventDefault();
            setUrl(`${process.env.REACT_APP_SERVER}:5000/room/${roomname}`);
            setName(nickname);
            localStorage.setItem(roomname, "true");
            history.push(`/room/${roomname}`)
          }}
        >
          <FormControl id="room name">
            <FormLabel>Room Name</FormLabel>
            <Input
              minW="xl"
              type="text"
              onChange={(e) => setRoomName(e.target.value)}
            />
          </FormControl>
          <FormControl id="username">
            <FormLabel>Nickname</FormLabel>
            <Input
              minW="xl"
              type="text"
              onChange={(e) => setNickname(e.target.value)}
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
