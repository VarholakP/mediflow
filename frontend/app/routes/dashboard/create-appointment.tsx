import { Box } from "@chakra-ui/react";
import React from "react";
import ChatComponent from "~/components/chat-component";

// Minimal loader to satisfy React Router requirements
export function loader() {
    return null;
}

interface Props {
    
}
 
interface State {
    
}
 
class CreateAppointment extends React.Component<Props, State> {
    state = { count: 0 }
    render() { 
        return (
            <>
            <Box height={"200vh"} >
                aaa
            </Box>
            </>
        );
    }
}
 
export default CreateAppointment;