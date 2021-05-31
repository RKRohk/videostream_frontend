import { Box, Text } from "@chakra-ui/layout";

interface ChatBoxProps {
    sender:String,
    message:String
}
const ChatBox:React.FC<ChatBoxProps> = (props) => {
    return <Box px="10" maxW="40" bg="facebook.500" color="whiteAlpha.800" borderRadius="lg" borderWidth="thin" alignSelf="flex-end">
        <Text fontSize="x-small">
            {props.sender}
        </Text>
        {props.message}
    </Box>
}

export default ChatBox;