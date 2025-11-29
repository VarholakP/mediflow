import { Box, Button, Textarea } from "@chakra-ui/react";

interface ChatInputProps {
    buttonAction: () => void;
    value: string;
    setValue: (value: string) => void;
}

function ChatInput({ buttonAction, value, setValue }: ChatInputProps) {
    return (
        <>
            <Box display={"flex"} flexDirection={"row"} padding={"2"} borderTopWidth={"1px"}>
                <Textarea
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    marginRight={"4"}
                    autoresize
                    color={"black"}
                />
                <Button color={"white"} bgColor={"#006494"} alignSelf={"end"} onClick={buttonAction}>Submit</Button>
            </Box>
        </>
    );
}

export default ChatInput;