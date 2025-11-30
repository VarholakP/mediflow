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
            <ScrollArea.Root height={"450px"} paddingLeft={"2"} paddingRight={"2"} variant={"always"} size={"lg"}>
            <ScrollArea.Viewport>
                <ScrollArea.Content paddingRight={"4"}>
                    {messages.map((msg:MessageObject, idx) => (
                    <ChatMessage key={idx} message={msg.message} timestamp={msg.timestamp} user={msg.user} />
                    ))}
                </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar bg={"black"} >
                <ScrollArea.Thumb bg={"#006494"} />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
            </ScrollArea.Root>
        </>
    );
}

export default ChatLog;