import { Button, Drawer, Avatar, IconButton } from "@chakra-ui/react";
import ChatLog from "./chat-log";
import ChatInput from "./chat-input";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

interface messageObject {
    message:string 
    user:boolean 
    timestamp: string
}

interface messageJsonObject {
    prompt:string 
}

function getTimestamp() {
    const date = new Date();
    return date.getMonth()
    +"\/" + date.getDate()
    + "\/" + date.getFullYear()
    + ", " + date.getHours()
    + ":" + (date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes())
}


function sendMessage(message: messageJsonObject) {
    return fetch("/api/patientagent/process", {
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
            body: JSON.stringify({ message: message.prompt })
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
    const [open, setOpen] = useState(false)

    const [messages, setMessages] = useState([
        { message: "Hello my name is Susan and I need medical assistance", user: true, timestamp: getTimestamp() }
    ]);
    const [inputValue, setInputValue] = useState("");


    const handleSend = async () => {
        if (inputValue.trim() === "") return;
        const messageObject = { message: inputValue, user: true, timestamp: getTimestamp() };
        const messageJsonObject = { prompt: inputValue }
        setMessages(prev => [
            ...prev,
            messageObject
        ]);
        setInputValue("");
        sendMessage(messageJsonObject);

        // Fetch AI response and add to chat log
        const aiReply = await fetchAIResponse(messageJsonObject);
        setMessages(prev => [
            ...prev,
            aiReply
        ]);
    };

    return (
        <>
            
            <Drawer.Root placement={"bottom"} open={open}  onOpenChange={(e) => setOpen(e.open)} size={"lg"}>
            <Drawer.Backdrop />
            <Drawer.Trigger asChild>
                <IconButton rounded={"full"} size={"2xl"} bgColor={"#006494"} color={"white"} pos={"absolute"} right={"10"} bottom={"8"}>
                    <MdEmail/>
                </IconButton>
            </Drawer.Trigger>
            <Drawer.Positioner paddingLeft={"60%"} paddingRight={"40"} paddingTop={"50%"}>
                <Drawer.Content minW={"450px"} bgColor={"white"}>
                <Drawer.CloseTrigger />
                <Drawer.Header bgColor={"#006494"}>
                    <Avatar.Root size={"md"}>
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://bit.ly/sage-adebayo" />
                    </Avatar.Root>
                    <Drawer.Title>Medical Assistant</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body padding={"0"}>
                    {/* <Box width={"full"} height={"100"} rounded={"md"} display={"flex"} flexDir={"column"}> */}
                        <ChatLog messages={messages} />
                        <ChatInput buttonAction={handleSend} value={inputValue} setValue={setInputValue} />
                    {/* </Box> */}
                </Drawer.Body>
                <Drawer.Footer />
                </Drawer.Content>
            </Drawer.Positioner>
            </Drawer.Root>
        </>
    );
}

export default ChatComponent;