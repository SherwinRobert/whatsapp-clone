import { doc, getDoc } from "firebase/firestore";
import db from "../firebase-config";

export const getSingleUser = async (id:string) => {
    const docRef = doc(db,"users",id)
    const docSnap = await getDoc(docRef);
    let data:any;
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        data = docSnap.data()
    } else {
        console.log("No such document!");
    }

    return data
}

