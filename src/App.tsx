import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {NickNameContext} from "./context/namecontext"
import "./App.css";
import MovieHall from "./pages/MovieHall";
import Home from "./pages/Home";
import { useState } from "react";
import { makeServer } from "./mirage/mirage";



if(process.env.NODE_ENV === 'development') {
  makeServer({environment:"development"})
}


function App() {
  const [nickname,setNickName] = useState("")
  return (
    <ChakraProvider>
      <NickNameContext.Provider value={{name:nickname,setName:(value:string) => setNickName(value)}}>
      <BrowserRouter>
        <Switch>
          <Route path="/api/room/:id">
            <MovieHall />
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
