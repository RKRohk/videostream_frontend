import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Popover, PopoverTrigger } from "@chakra-ui/popover";
import { useRef, useState } from "react";

const Home = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [roomname, setRoomName] = useState("");
  const [nickname, setNickname] = useState("");
  const [url, setUrl] = useState("");

  return (
    <Box>
      <Text> Movie Time </Text>
      <Text> Weekends from 11:00 PM to 1:00 AM</Text>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUrl(`localhost:5000/room/${roomname}`);

          localStorage.setItem(roomname,"true")
          
        }}
      >
        <FormControl id="room name">
          <FormLabel>Room Name</FormLabel>
          <Input type="text" onChange={(e) => setRoomName(e.target.value)} />
        </FormControl>
        <FormControl id="username">
          <FormLabel>Nickname</FormLabel>
          <Input type="text" onChange={(e) => setNickname(e.target.value)} />
        </FormControl>
        <Button type="submit"> Create Room </Button>
      </form>

      <Input
        id="room_link"
        value={url}
        contentEditable="false"
        variant="unstyled"
        isReadOnly={true}
      />
    </Box>
  );
};

export default Home;
