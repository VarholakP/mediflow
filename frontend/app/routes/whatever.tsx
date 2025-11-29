import React from "react";
import ChatComponent from "~/components/chat-component";
import ChatLog from "~/components/chat-log";

// Minimal loader to satisfy React Router requirements
export function loader() {
    return null;
}

interface Props {
    
}
 
interface State {
    
}
 
class Whatever extends React.Component<Props, State> {
    state = { count: 0 }
    render() { 
        return (
            <>
            <ChatComponent></ChatComponent>
            </>
        );
    }
}
 
export default Whatever;