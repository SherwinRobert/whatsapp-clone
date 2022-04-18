import { collection, query,limit, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase-config";

interface IUsers{
    id: string,
    name: string,
    email: string
}

const useUsersFromDatabase = () => {
    const [users, setUsers] = useState<IUsers[] | []>([])
    
    const getUsers = async () => {

        const first = query(collection(db, "users"), limit(10));
        const documentSnapshots = await getDocs(first);

        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

        const users: IUsers[] = [];
        documentSnapshots.forEach((doc) => {
            users.push({...doc.data(), id : doc.id} as IUsers)
        });

        return [users,lastVisible] as const
        
    }

    const setUsersInState = async () => {
        let [users] = await getUsers() //add last visible
        setUsers(users)
    }

    useEffect(() => {
        setUsersInState()
    },[])
    
    return users

}

export default useUsersFromDatabase