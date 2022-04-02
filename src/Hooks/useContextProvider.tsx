import { createContext, useContext, useReducer } from "react";

interface IChildren{
    children: React.ReactNode
}

interface InitalState{
    senderId: string
    recieverId: string
    reciever: string
    chatId : string
    showPanel: boolean
    setNewChat : boolean
}

interface IAction{
    type: string,
    payload:string
}

interface IContext{
    state: InitalState,
    dispatch: React.Dispatch<IAction>
}

const defaultDispatch: React.Dispatch<IAction> = () => {}

const intialState:InitalState = {
        senderId: "",
        recieverId: "",
        reciever: "",
        chatId: "",
        showPanel: true,
        setNewChat : false
    }
const Ctx = createContext<IContext>({
    state: intialState,
    dispatch : defaultDispatch
})

export const useTopLevelContext = () => {
    return useContext(Ctx)
}

const ContextProvider = ({ children }: IChildren) => {

    const reducerFun = (prevState:InitalState, action:IAction):InitalState => {
        
        switch (action.type) {
            case 'setReciever':
                return {
                    ...prevState,
                    recieverId:action.payload
                }
            case 'setSender':
                console.log("setSender")
                return {
                    ...prevState,
                    senderId:action.payload
                }
            case 'setRecieverName':
                console.log("setReceiverName")
                return {
                    ...prevState,
                    reciever:action.payload
                }
            case 'setNewChat':
                console.log('setNewChat')
                return {
                    ...prevState,
                    chatId : action.payload,
                    setNewChat: false
                }
            case 'setShowPanel':
                break;
            default:
                console.log("no cases selected in use reducer")
                break;
        }
        return prevState
    }

    const [topState, dispatch] = useReducer(reducerFun, intialState)

    return (
        <Ctx.Provider value={{ state:topState, dispatch: dispatch }}>
            {children}
        </Ctx.Provider>
    )
}

export default ContextProvider;