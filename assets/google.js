window.dash_clientside = Object.assign({}, window.dash_clientside, {
    clientside: {
        login_google: function (_) {
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
    }
});