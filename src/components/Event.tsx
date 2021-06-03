import { Box,Text } from "@chakra-ui/layout"
interface EventType{
    message:string
}
const Event:React.FC<EventType> = (props) => {
    return <Text textColor="white" textAlign="center" as="i">
            {props.message}
        </Text>
}

export default Event