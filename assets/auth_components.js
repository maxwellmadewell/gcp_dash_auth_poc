document.addEventListener('DOMContentLoaded', () => {
    console.log("++++++++++++++++++++++++++++++++++++++++++")
    console.log("")
    console.log("+++++++++++++   DOM LOADED  ++++++++++++++")
    console.log("")
    console.log("++++++++++++++++++++++++++++++++++++++++++")
    const firebaseConfig = {
        apiKey: "AIzaSyAZhH8_A_NmQCY4EFQRTtOUx6RSAzbmmZw",
        authDomain: "authmapdemo.firebaseapp.com",
        databaseURL: "https://authmapdemo-default-rtdb.firebaseio.com",
        projectId: "authmapdemo",
        storageBucket: "authmapdemo.appspot.com",
        messagingSenderId: "831221014535",
        appId: "1:831221014535:web:142118fada6f8af6a54aa2"
    };

// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            console.log(user)
            console.log(user.uid);
        } else {
            // User not logged in or has just logged out.
        }
    });
});
