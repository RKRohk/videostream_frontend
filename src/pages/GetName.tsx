import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useContext, useState } from "react";
import { NickNameContext } from "../context/namecontext";

const GetName: React.FC = () => {
  const { name, setName } = useContext(NickNameContext);

  const [nickname, setNickname] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setName(nickname);
      }}
    >
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input onChange={(e) => setNickname(e.target.value)} />
        <Button type="submit">Save!</Button>
      </FormControl>
    </form>
  );
};

export default GetName;
