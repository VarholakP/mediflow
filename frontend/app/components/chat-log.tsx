import { Box } from "@chakra-ui/react";
import ChatMessage from "./chat-message";

function ChatLog() {
    return (
        <>
            <Box borderRadius={"md"} borderWidth={"1px"} height={"full"}>
                <ChatMessage message="Hello" timestamp="bababooey"/>
            </Box>
        </>
    );
}

export default ChatLog;