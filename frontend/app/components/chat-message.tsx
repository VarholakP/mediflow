import { Box } from "@chakra-ui/react";
import React from "react";

type ChatMessageProps = {
    message: string;
    timestamp: string;
    user:boolean;
};

function getTimestamp() {
    const date = new Date();
    return date.getMonth()
    +"\/" + date.getDate()
    + "\/" + date.getFullYear()
    + ", " + date.getHours()
    + ":" + date.getMinutes()
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, user, timestamp }) => (
    <>
    <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        margin="8px 0"
    >
        <Box
            bg={user?"blue.500":"gray.200"}
            color={user?"white":"black"}
            px={4}
            py={2.5}
            borderRadius={"16px 16px 4px 16px"}
            maxW={"50%"}
            wordBreak={"break-word"}
        >
            {message}
        </Box>
            <span style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>
                {timestamp}
            </span>
    </Box>
    </>
    
);

export default ChatMessage;