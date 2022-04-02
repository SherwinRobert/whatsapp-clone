import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1Rq3BchMvCLjw9TvHI1DEyoe1uPLBTAM",
  authDomain: "what-s-app-clone-87c65.firebaseapp.com",
  projectId: "what-s-app-clone-87c65",
  storageBucket: "what-s-app-clone-87c65.appspot.com",
  messagingSenderId: "176944555601",
  appId: "1:176944555601:web:29d90bd90317b2ee1cba70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;