document.addEventListener('DOMContentLoaded', () => {
    const app = firebase.app();
    console.log(app)
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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

function googleLogin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();
    googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user)
        })
        .catch(console.log)
}