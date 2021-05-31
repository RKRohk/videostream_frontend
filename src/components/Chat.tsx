import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React, {
  FormEventHandler,
  useContext,
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

  useLayoutEffect(() => {
    props.socket.on("message", (args) => {
      const newMessage = args as Message;
      dispatch({ type: newMessage.type, payload: newMessage });
      scrollToBottom()
    });
  }, []);

  return (
    <Box borderWidth="thin" p="1.5">
      <Box minH="lg" maxH="lg" overflowY="scroll">
        <Flex flexDirection="column">
          {state.map((message) => MakeChat(message))}
          <Box pb="10" ref={chatRef}></Box>
        </Flex>
      </Box>
      <Box style={{opacity:"1"}}>
        <form onSubmit={handleSubmit}>
          <Flex justify="space-around">
            <input
              value={message}
              type="text"
              style={{ borderWidth: "1px", width: "100%" }}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};

export default Chat;
