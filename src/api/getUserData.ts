import { doc, getDoc,setDoc } from "firebase/firestore";
import db from "../firebase-config";

export const getSingleUser = async (id:string) => {
    const docRef = doc(db,"users",id)
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}

export const msgUpload = async(senderId:string,recieverId: string,textContent:string) => {
    await setDoc(doc(db, "messages", senderId), {
    recieverId: recieverId,
    textContent: textContent
});

}