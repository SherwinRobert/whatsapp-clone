import { createContext, useContext, useEffect, useReducer, useRef } from "react";

interface IChildren{
    children: React.ReactNode
}

interface InitalState{
    senderId: string
    recieverId: string
    reciever: string
    chatId : string
    showPanel: boolean
    setNewChat: boolean
    userName: string
    ref : React.RefObject<HTMLDivElement> | undefined
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

let divRef;

const intialState:InitalState = {
        senderId: "",
        recieverId: "",
        reciever: "",
        chatId: "",
        showPanel: true,
        setNewChat: false,
        userName: "",
        ref: divRef
    }
const Ctx = createContext<IContext>({
    state: intialState,
    dispatch : defaultDispatch
})


export const useTopLevelContext = () => {
    return useContext(Ctx)
}

const ContextProvider = ({ children }: IChildren) => {

    divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log()
    },[])
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
            case 'setChat':
                console.log('setNewChat')
                return {
                    ...prevState,
                    chatId : action.payload,
                    setNewChat:false
                }
            case 'setNewChat':
                return {
                    ...prevState,
                    setNewChat:true
                }
            case 'disableNewChat':
                return {
                    ...prevState,
                    setNewChat:true
                }
            case "togglePanel":
                return {
                    ...prevState,
                    showPanel:false
                }
            case "setUserName":
                return {
                    ...prevState,
                    userName:action.payload
                }
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