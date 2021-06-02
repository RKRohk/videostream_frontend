import React from "react";
import { ActionAction, Message, MessageAction } from "../reducers/messageReducer";

interface ChatContextInterface {
    state:Message[]
    dispatch:React.Dispatch<MessageAction|ActionAction>
}

const ChatContext = React.createContext<ChatContextInterface|object>({})