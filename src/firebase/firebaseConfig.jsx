import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJKUmxB7HcGa0t51Jn-esGuzBC9qhEg4s",
  authDomain: "learningauth-58ab5.firebaseapp.com",
  projectId: "learningauth-58ab5",
  storageBucket: "learningauth-58ab5.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, RecaptchaVerifier };
