export enum ActionTypes {
    ACTION,
    MESSAGE
}

interface Payload {
    by:string,
    message:string
    type:ActionTypes
}

export type MessageAction = {
    type: ActionTypes.MESSAGE,
    payload: Payload
}

export type ActionAction = {
    type:ActionTypes.ACTION,
    payload:Payload
}

export type Message = Payload

type State = Message[]

export const initialState:State = []

export const messageReducer = (state:State,action: MessageAction | ActionAction) => {

    const {type,payload} = action

    switch(type) {
        case ActionTypes.MESSAGE: {
            payload.type = ActionTypes.MESSAGE
            return state.concat(payload)
        }
        case ActionTypes.ACTION: {
            payload.type = ActionTypes.ACTION
            return state.concat(payload)
        }
        default:
            throw Error("Invalid")
    }
}