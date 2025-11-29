import { Box } from "@chakra-ui/react";
import ChatLog from "./chat-log";
import ChatInput from "./chat-input";

function ChatComponent() {
    return ( 
        <>
            <Box width={"full"} height={"vh"} rounded={"md"} display={"flex"} flexDir={"column"}>
                <ChatLog></ChatLog>
                <ChatInput></ChatInput>
            </Box>
        </> 
    );
}

export default ChatComponent;