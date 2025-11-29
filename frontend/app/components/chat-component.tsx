import { Box } from "@chakra-ui/react";
import ChatLog from "./chat-log";
import ChatInput from "./chat-input";
import { useState } from "react";

interface messageObject {
    message:string 
    user:boolean 
    timestamp: string
}

interface messageJsonObject {
    message:string 
}

function getTimestamp() {
    const date = new Date();
    return date.getMonth()
    +"\/" + date.getDate()
    + "\/" + date.getFullYear()
    + ", " + date.getHours()
    + ":" + (date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())
}


function sendMessage(message: messageObject) {
    return fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    });
}

async function fetchAIResponse(message: messageJsonObject): Promise<messageObject> {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message.message })
        });
        const data = await response.json();
        return {
            message: data.reply || "(No response)",
            user: false,
            timestamp: getTimestamp()
        };
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return { message: "There was an error with our server", user:false,timestamp:getTimestamp()};
    }
}

function ChatComponent() {
    const [messages, setMessages] = useState([
        { message: "Hello my name is Susan and I need medical assistance", user: true, timestamp: getTimestamp() }
    ]);
    const [inputValue, setInputValue] = useState("");


    const handleSend = async () => {
        if (inputValue.trim() === "") return;
        const messageObject = { message: inputValue, user: true, timestamp: getTimestamp() };
        setMessages(prev => [
            ...prev,
            messageObject
        ]);
        setInputValue("");
        sendMessage(messageObject);

        // Fetch AI response and add to chat log
        const aiReply = await fetchAIResponse(messageObject);
        setMessages(prev => [
            ...prev,
            aiReply
        ]);
    };

    return (
        <>
            <Box width={"full"} height={"94vh"} rounded={"md"} display={"flex"} flexDir={"column"}>
                <ChatLog messages={messages} />
                <ChatInput buttonAction={handleSend} value={inputValue} setValue={setInputValue} />
            </Box>
        </>
    );
}

export default ChatComponent;