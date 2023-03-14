

document.addEventListener('DOMContentLoaded', () => {
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

    // const app = firebase.app();
    console.log(app)
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,   
        ],
        signInSuccessUrl: 'https://www.cnn.com',
        callbacks: {
            // signInFailure callback must be provided to handle merge conflicts which
            // occur when an existing credential is linked to an anonymous user.
            signInFailure: function (error) {
                // For merge conflicts, the error.code will be
                // 'firebaseui/anonymous-upgrade-merge-conflict'.
                if (error.code != 'firebaseui/anonymous-upgrade-merge-conflict') {
                    return Promise.resolve();
                }
                // The credential the user tried to sign in with.
                var cred = error.credential;
                // Copy data from anonymous user to permanent user and delete anonymous
                // user.
                // ...
                // Finish sign-in after data is copied.
                return firebase.auth().signInWithCredential(cred);
            }
        }
        // Other config options...
    });

});
