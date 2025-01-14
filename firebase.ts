import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCTo6GsLpEwjQf7fhx-1XrcJzOQzkzh8Xg",
  authDomain: "chat-with-pdf-e6984.firebaseapp.com",
  projectId: "chat-with-pdf-e6984",
  storageBucket: "chat-with-pdf-e6984.firebasestorage.app",
  messagingSenderId: "514252692424",
  appId: "1:514252692424:web:25efe31175a24ae9cf7efd"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
