const googleProvider = new firebase.auth.GoogleAuthProvider();
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
const app = firebase.initializeApp(firebaseConfig);
// Initialize Firebase
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var uid = user.uid;
        var email = user.email;
        var displayName = user.displayName;
        var photoURL = user.photoURL;
        var emailVerified = user.emailVerified;
        var providerData = user.providerData;
        // Save user's credentials to localStorage
        var authInfo = {'uid': uid, 'displayName': displayName,
        'email': email, 'emailVerified': emailVerified}
    } else {
        // User is signed out.
        console.log("-----signed out----- on state observer")
        var authInfo = null
    }
    localStorage.setItem('authInfo', authInfo)
    const event = new Event('authUpdated');
    document.dispatchEvent(event);
});

window.dash_clientside = Object.assign({}, window.dash_clientside, {
    clientside: {
        window_init: function (_) {
            console.log("test")
            // const ui = new firebaseui.auth.AuthUI(firebase.auth());
            // var uiConfig = {
            //     callbacks: {
            //         signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            //             // User successfully signed in.
            //             // Return type determines whether we continue the redirect automatically
            //             // or whether we leave that to developer to handle.
            //             return true;
            //         },
            //     },
            //     // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            //     signInFlow: 'popup',
            //     signInSuccessUrl: () => {return false},
            //     signInOptions: [
            //         // Leave the lines as is for the providers you want to offer your users.
            //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //         firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //         firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //         firebase.auth.EmailAuthProvider.PROVIDER_ID,
            //     ],
            //     // Terms of service url.
            //     tosUrl: 'https://www.github.com',
            //     // Privacy policy url.
            //     privacyPolicyUrl: 'https://www.google.com'
            // };
            // ui.start('#firebaseui-auth-container', uiConfig);
            // return "After Auth Start (async)"
        },
        login_google: function (_) {
            let user = firebase.auth()
                .signInWithPopup(googleProvider)
                .then((userCredential) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = user.credential;
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = credential.accessToken;
                    // The signed-in user info.
                    var user = userCredential.user;
                    // IdP data available in result.additionalUserInfo.profile

                    console.log("---------Logged IN ---------")
                }).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                    return [errorMessage]
                });
            console.log("returning")
            return "RETURN TOO SOON"
        },
        logout_google: function (_) {
            firebase.auth().signOut().then((result) => {
                // Sign-out successful.
                console.log(result)
                console.log("SIGNED OUT")
                return null
            }).catch((error) => {
                // An error happened.
                console.log("ERROR OCCURRED")
                return null
            });
        }
    }
});