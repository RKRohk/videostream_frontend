import { Box, Text } from "@chakra-ui/layout";

interface ChatBoxProps {
    sender:String,
    message:String
}
const ChatBox:React.FC<ChatBoxProps> = (props) => {
    const me = props.sender == "me"
    return <Box my="1.5" mx="1" px="4" minW="20" maxW="40" bg={ me ? "linkedin.600" : "facebook.800"} color="whiteAlpha.800" borderRadius="lg" borderWidth="thin" alignSelf= { me ?  "flex-end" : "flex-start" }>
        <Text fontSize="x-small">
            {props.sender}
        </Text>
        {props.message}
    </Box>
}

export default ChatBox;