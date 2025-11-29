import { Box, Button, Textarea } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";

function ChatInput({buttonAction}) {
    return ( 
    <>
        <Box display={"flex"} flexDirection={"row"} padding={"2"} borderRadius={"md"} borderWidth={"1px"}>
            <Textarea autoresize marginRight={"4"}/>
            <Button alignSelf={"end"} onClick={buttonAction}>Submit</Button>
        </Box>
    </> 
    );
}

export default ChatInput;