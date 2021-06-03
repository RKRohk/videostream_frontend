import { Button } from "@chakra-ui/button";
import { ChatIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import React, {
  FormEventHandler,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import { NickNameContext } from "../context/namecontext";
import {
  messageReducer,
  initialState,
  Message,
  ActionTypes,
} from "../reducers/messageReducer";
import ChatBox from "./ChatBox";
import Event from "./Event";

interface ChatProps {
  socket: Socket;
}

const MakeChat = (message: Message) => {
  if (message.type == ActionTypes.MESSAGE) {
    return <ChatBox sender={message.by} message={message.message} />;
  } else {
    return <Event />;
  }
};

export const Chat: React.FC<ChatProps> = (props) => {
  const [message, setMessage] = useState("");
  const [state, dispatch] = useReducer(messageReducer, initialState);
  const { name } = useContext(NickNameContext);
  const chatRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage: Message = {
      by: "me",
      message: message,
      type: ActionTypes.MESSAGE,
    };
    dispatch({ type: ActionTypes.MESSAGE, payload: newMessage });
    props.socket.emit("message", {
      by: name,
      message: newMessage.message,
      type: newMessage.type,
    });
    scrollToBottom();
    setMessage("");
  };

  useEffect(() => {
    props.socket.on("message", (args) => {
      const newMessage = args as Message;
      dispatch({ type: newMessage.type, payload: newMessage });
      scrollToBottom()
    });
  }, [props.socket]);

  return (
    <Box borderColor="black" borderWidth="thin" p="1.5">
      <Box minH="lg" maxH="lg" overflowY="scroll">
        <Flex flexDirection="column">
          {state.map((message) => MakeChat(message))}
          <Box pb="10" ref={chatRef}></Box>
        </Flex>
      </Box>
      <Box style={{opacity:"1"}}>
        <form onSubmit={handleSubmit}>
          <Flex justify="space-around">
            <Input
              value={message}
              type="text"
              width="max"
              textColor="white"
              borderWidth="1px"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button bgColor="green.300" type="submit"> <ChatIcon/> </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
