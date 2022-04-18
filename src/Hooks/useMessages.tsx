import { useState , useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import db from '../firebase-config' 

export interface IMessages{
    reciever: string
    sender: string
    messageContent:string
}

export const useMessages = (chatId:string) => {
    const [messageList, setMessageList] = useState<IMessages[]>()
    
    useEffect(() => {

        if (chatId) {
            try {
            const q = query(collection(db, "messages",chatId,"message"),orderBy("timeStamp", "desc"));
            const unsub = onSnapshot(q, (doc) => {
            
            let messages: IMessages[] = []
            
            doc.forEach((d) => {
                messages.push(d.data() as IMessages)
            })

            setMessageList(messages)
            });
            
            return unsub;
        } catch (error) {
            console.log(error)
        }
        }
        
    }, [chatId])

    return [messageList]
}
