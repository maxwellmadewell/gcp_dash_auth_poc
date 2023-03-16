window.dash_clientside = Object.assign({}, window.dash_clientside, {
    clientside: {
        google_login: function (_) {
            // Import the functions you need from the SDKs you need
            // import {initializeApp} from "firebase/app";
            // TODO: Add SDKs for Firebase products that you want to use
            // https://firebase.google.com/docs/web/setup#available-libraries
            // const app = firebase.app()
            // Your web app's Firebase configuration
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
            const app = firebase.initializeApp(firebaseConfig);
            const googleProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth()
                .signInWithPopup(googleProvider)
                .then((result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = result.credential;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // IdP data available in result.additionalUserInfo.profile
                    console.log("Checking Logged In Credentials")
                    console.log(user)
                    console.log(result)
                    console.log("------------------")
                    return [user]
                }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        },
        firebase_init: function (_) {
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
            const ui = new firebaseui.auth.AuthUI(firebase.auth());

            var uiConfig = {
                callbacks: {
                    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                        // User successfully signed in.
                        // Return type determines whether we continue the redirect automatically
                        // or whether we leave that to developer to handle.
                        return true;
                    },
                },
                // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
                signInFlow: 'popup',
                signInSuccessUrl: 'https://localhost:8050',
                signInOptions: [
                    // Leave the lines as is for the providers you want to offer your users.
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                    firebase.auth.GithubAuthProvider.PROVIDER_ID,
                    firebase.auth.EmailAuthProvider.PROVIDER_ID,
                ],
                // Terms of service url.
                tosUrl: 'https://www.github.com',
                // Privacy policy url.
                privacyPolicyUrl: 'https://www.google.com'
            };
            ui.start('#firebaseui-auth-container', uiConfig);
            return "After Auth Start (async)"
        }
    }
});


//
//
// document.addEventListener('DOMContentLoaded', function (children) {
//             const app = firebase.app();
//             console.log(app)
//             const loadEl = document.querySelector('#load');
//             // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//             // The Firebase SDK is initialized and available here!
//
//             firebase.auth().onAuthStateChanged(user => { });
//             firebase.database().ref('/path/to/ref').on('value', snapshot => { });
//             firebase.firestore().doc('/foo/bar').get().then(() => { });
//             firebase.functions().httpsCallable('yourFunction')().then(() => { });
//             firebase.messaging().requestPermission().then(() => { });
//             firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
//             firebase.analytics(); // call to activate
//             firebase.analytics().logEvent('tutorial_completed');
//             firebase.performance(); // call to activate
//
//             // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
//
//             try {
//                 let app = firebase.app();
//                 let features = [
//                     'auth',
//                     'database',
//                     'firestore',
//                     'functions',
//                     'messaging',
//                     'storage',
//                     'analytics',
//                     'remoteConfig',
//                     'performance',
//                 ].filter(feature => typeof app[feature] === 'function');
//                 loadEl.textContent = `Firebase SDK loaded with ${features.join(', ')}`;
//             } catch (e) {
//                 console.error(e);
//                 loadEl.textContent = 'Error loading the Firebase SDK, check the console.';
//             }
//         }),
//
//     }
// });
