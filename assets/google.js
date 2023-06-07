const googleProvider = new firebase.auth.GoogleAuthProvider();
const firebaseConfig = {
    apiKey: "AIzaSyAZhH8_A_NmQCY4EFQRTtOUx6RSAzbmmZw",
    authDomain: "authmapdemo.firebaseapp.com",
    databaseURL: "https://authmapdemo-default-rtdb.firebaseio.com",
    projectId: "authmapdemo",
    storageBucket: "authmapdemo.appspot.com",
    messagingSenderId: "831221014535",
    appId: "1:831221014535:web:142118fada6f8af6a54aa2"
};
const app = firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let authInfo = {
                'uid': user.uid,
                'displayName': user.displayName,
                'email': user.email,
                'photoURL': user.photoURL,
                'emailVerified': user.emailVerified,
                'providerData': user.providerData
            }
            localStorage.setItem('userInfoStorage', JSON.stringify(authInfo))
            const eventLogin = new Event('login', {bubbles: true});
            document.dispatchEvent(eventLogin);
        } else {
            const authInfoEmpty = {
                'uid': "",
                'displayName': "",
                'email': "",
                'emailVerified': false,
                'photoURL': 'https://via.placeholder.com/100',
                'providerData': ""
            };
            localStorage.setItem('userInfoStorage', JSON.stringify(authInfoEmpty))
            const eventLogout = new Event('logout', {bubbles: true});
            document.dispatchEvent(eventLogout);
        }
    });
});

window.dash_clientside = Object.assign({}, window.dash_clientside, {
    clientside: {
        log_user_out: function (clicks) {
            firebase.auth().signOut().then((result) => {
                return "true"
            }).catch((error) => {
                console.log("Error on Firebase signout")
                return "false"
            });
        },
        log_user_in: function (clicks1, clicks2) {
            if (clicks1 == null && clicks2 == null ) {
                return "false"
            }
            let user = firebase.auth()
                .signInWithPopup(googleProvider)
                .then((userCredential) => {
                    user_creds = {
                        "credential": user.credential,
                        "token": user.credential.accessToken,
                        "user": userCredential.user
                    }
                    let user_creds_string = JSON.stringify(user_creds)
                    localStorage.setItem("userCredentialStorage", user_creds_string)
                    return "false"
                }).catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    let email = error.email;
                    let credential = error.credential;
                    return "false"
                });
        }
    }
});