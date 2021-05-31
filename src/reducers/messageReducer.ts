enum ActionTypes {
    ACTION,
    MESSAGE
}

interface Payload {
    by:string,
    message:string
}

type MessageAction = {
    type: ActionTypes.MESSAGE,
    payload: Payload
}

type ActionAction = {
    type:ActionTypes.ACTION,
    payload:Payload
}

type message = Payload

type State = message[]

const initialState:State = []

export const messageReducer = (state:State,action: MessageAction | ActionAction) => {

    const {type,payload} = action

    switch(type) {
        case ActionTypes.MESSAGE: {
            return state.concat(payload)
        }
        case ActionTypes.ACTION: {
            return state.concat(payload)
        }
        default:
            return state
    }
}