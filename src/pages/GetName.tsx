import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Center, Flex } from "@chakra-ui/layout";
import { useContext, useState } from "react";
import { NickNameContext } from "../context/namecontext";
import bg from "./home_bg.jpg";

const GetName: React.FC = () => {
  const { name, setName } = useContext(NickNameContext);

  const [nickname, setNickname] = useState("");

  return (
    <Flex  style={{height:"100vh"}} backgroundImage={bg} backgroundSize="contain" alignItems="center" justifyContent="center">
      <Box bgColor="white" p="5" borderRadius="xl" my="auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setName(nickname);
          }}
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input onChange={(e) => setNickname(e.target.value)} />
            
          </FormControl>
          <Center mt="5">
          <Button  type="submit">Save!</Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default GetName;
