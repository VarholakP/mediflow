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
    + ":" + date.getMinutes()
}

function sendMessage(message:messageObject) {
    fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    })
    .then(response => response.json())
    .catch(error => {
        console.error("Error sending message:", error);
    });
}

function ChatComponent() {
    const [messages, setMessages] = useState([
        { message: "Hello I am Edward and I have a Roxor in my knee", user: true, timestamp: getTimestamp() }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (inputValue.trim() === "") return;
        const messageObject = { message: inputValue, user: true, timestamp: getTimestamp() }
        setMessages([
            ...messages,
            messageObject
        ]);
        sendMessage(messageObject)
        setInputValue("");
    };

    return (
        <>
            <Box width={"full"} height={"vh"} rounded={"md"} display={"flex"} flexDir={"column"}>
                <ChatLog messages={messages} />
                <ChatInput buttonAction={handleSend} value={inputValue} setValue={setInputValue} />
            </Box>
        </>
    );
}

export default ChatComponent;