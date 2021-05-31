import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import ChatBox from "./ChatBox";
import Event from "./Event";

export const Chat = () => {
  return (
    <Box borderWidth="thin" p="1.5">
      <Flex h="lg" flexDirection="column">
        <ChatBox sender={"Rohan"} message={"Hi"} />
        <ChatBox sender={"Sahil"} message={"Bye"} />
        <Event/>
      </Flex>
      <Box>
          <form >
              <Flex justify="space-around">
                  <input type="text" style={{borderWidth:"1px",width:"100%"}}/>
                  <Button type="submit">Send</Button>
              </Flex>
          </form>
      </Box>
    </Box>
  );
};

export default Chat;
