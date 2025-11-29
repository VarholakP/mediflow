import { Box, ScrollArea } from "@chakra-ui/react";
import ChatMessage from "./chat-message";

interface MessageObject {
    message:string; 
    user:boolean; 
    timestamp: string;
}


function ChatLog({ messages }: { messages: MessageObject[] }) {
    return (
        <>
            <ScrollArea.Root height={"full"} padding={"4"}>
            <ScrollArea.Viewport>
                <ScrollArea.Content >
                    {messages.map((msg:MessageObject, idx) => (
                    <ChatMessage key={idx} message={msg.message} timestamp={msg.timestamp} user={msg.user} />
                    ))}
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
                <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
            </ScrollArea.Root>
        </>
    );
}

export default ChatLog;