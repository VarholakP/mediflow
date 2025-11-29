import { Box, Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function ChatInput() {
    return ( 
    <>
        <Box display={"flex"} flexDirection={"row"} padding={"2"} borderRadius={"md"} borderWidth={"1px"}>
            <Input marginRight={"4"}></Input>
            <Button>GRAH</Button>
        </Box>
    </> 
    );
}

export default ChatInput;