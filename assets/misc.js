// login_google: function (clicks) {
//         console.log("[ClientSide - login_google] -Started")
//         if (clicks == null) {
//             return
//         }
//         let user = firebase.auth()
//             .signInWithPopup(googleProvider)
//             .then((userCredential) => {
//                 /** @type {firebase.auth.OAuthCredential} */
//                 var credential = user.credential;
//                 // This gives you a Google Access Token. You can use it to access the Google API.
//                 var token = credential.accessToken;
//                 // The signed-in user info.
//                 var user = userCredential.user;
//                 // IdP data available in result.additionalUserInfo.profile
//             }).catch((error) => {
//                 let errorCode = error.code;
//                 let errorMessage = error.message;
//                 let email = error.email;
//                 let credential = error.credential;
//                 return [errorMessage]
//             });
//         return "Secondary"
// }
// logout_google: function (_) {
//     firebase.auth().signOut().then((result) => {
//         return true
//     }).catch((error) => {
//         console.log("[logout_google] - Error on Firebase signout")
//         return false
//     });
// }


        // for (const key in localStorage) {
//     if (localStorage.hasOwnProperty(key)) {
//         const value = localStorage.getItem(key);
//         console.log(`${key}: ${value}`);
//     }
// }