import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {NickNameContext} from "./context/namecontext"
import "./App.css";
import Index from "./pages";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [nickname,setNickName] = useState("")
  return (
    <ChakraProvider>
      <NickNameContext.Provider value={{name:nickname,setName:(value:string) => setNickName(value)}}>
      <BrowserRouter>
        <Switch>
          <Route path="/room/:id">
            <Index />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </BrowserRouter>
      </NickNameContext.Provider>
    </ChakraProvider>
  );
}

export default App;
