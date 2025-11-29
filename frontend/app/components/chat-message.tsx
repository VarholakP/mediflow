import React from "react";

type ChatMessageProps = {
    message: string;
    timestamp?: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, timestamp }) => (
    <>
    <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        margin: "8px 0"
    }}>
        <div style={{
            background: "#0078fe",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "16px 16px 4px 16px",
            maxWidth: "70%",
            wordBreak: "break-word"
        }}>
            {message}
        </div>
        {timestamp && (
            <span style={{ fontSize: "0.75rem", color: "#888", marginTop: "4px" }}>
                {timestamp}
            </span>
        )}
    </div>
    </>
    
);

export default ChatMessage;