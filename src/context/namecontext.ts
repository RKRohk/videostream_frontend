import React from "react";
interface NickNameContextInterface {
    name:string,
    setName: (a:string) => void
}
export const NickNameContext = React.createContext<NickNameContextInterface>({
    name:"",
    setName: () => {}
})