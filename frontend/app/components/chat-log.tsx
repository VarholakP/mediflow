import { Box } from "@chakra-ui/react";
import ChatMessage from "./chat-message";

function ChatLog() {
    return (
        <>
            <Box borderRadius={"md"} borderWidth={"1px"} height={"full"} padding={"4"}>
                <ChatMessage message="Hello I am Edward and I have a Roxor in my knee" timestamp="bababooey" user={true}/>
            </Box>
        </>
    );
}

export default ChatLog;