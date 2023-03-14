// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const f irebaseConfig = {
  apiKey: "AIzaSyAZhH8_A_NmQCY4EFQRTtOUx6RSAzbmmZw",
  authDomain: "authmapdemo.firebaseapp.com",
  databaseURL: "https://authmapdemo-default-rtdb.firebaseio.com",
  projectId: "authmapdemo",
  storageBucket: "authmapdemo.appspot.com",
  messagingSenderId: "831221014535",
  appId: "1:831221014535:web:142118fada6f8af6a54aa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);