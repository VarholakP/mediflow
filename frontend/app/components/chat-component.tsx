import { Box } from "@chakra-ui/react";
import ChatLog from "./chat-log";
import ChatInput from "./chat-input";
import { useState } from "react";

interface messageObject {
    message:string 
    user:boolean 
    timestamp: string
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

async function fetchAIResponse(message: messageObject): Promise<string> {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message.message })
        });
        const data = await response.json();
        return data.reply || "(No response)";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Sorry, there was an error getting a response.";
    }
}

function ChatComponent() {
    const [messages, setMessages] = useState([
        { message: "Hello I am Edward and I have a Roxor in my knee", user: true, timestamp: getTimestamp() }
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
            { message: aiReply, user: false, timestamp: getTimestamp() }
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