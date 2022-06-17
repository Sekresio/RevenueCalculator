import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyAKn5Gb9OsqeHKKk1N3dJQZGBG89dvbXp8",
    authDomain: "revenuecalculatordb.firebaseapp.com",
    projectId: "revenuecalculatordb",
    storageBucket: "revenuecalculatordb.appspot.com",
    messagingSenderId: "189791091470",
    appId: "1:189791091470:web:a6ce60aed62e7763d1b55f"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);