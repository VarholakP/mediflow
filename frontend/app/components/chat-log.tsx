import { Box } from "@chakra-ui/react";
import ChatMessage from "./chat-message";

interface MessageObject {
    message:string; 
    user:boolean; 
    timestamp: string;
}


function ChatLog({ messages }: { messages: MessageObject[] }) {
    return (
        <>
            <Box height={"full"} padding={"4"}>
                {messages.map((msg:MessageObject, idx) => (
                    <ChatMessage key={idx} message={msg.message} timestamp={msg.timestamp} user={msg.user} />
                ))}
            </Box>
        </>
    );
}

export default ChatLog;