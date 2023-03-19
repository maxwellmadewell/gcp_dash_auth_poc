// Save copy of original setItem method
// const originalSetItem = localStorage.setItem;
//
// // Overwrite setItem to emit authUpdate event and original setItem
// localStorage.setItem = function (key, value) {
//     const event = new Event('authUpdate');
//     event.value = value; // Optional..
//     event.key = key; // Optional..
//     if (['uid', 'displayName', 'email', 'emailVerified'].includes(key)) {
//         console.log('Dispatch for key: ' + key)
//         document.dispatchEvent(event);
//     }
//     originalSetItem.apply(this, arguments);
// };

// const localStorageSetHandler = function (e) {
//     console.log('localStorage.set("' + e.key + '", "' + e.value + '") was called');
//     const newValue = localStorage.getItem('auth-info')
//     const hiddenInput = document.getElementById('output');
//     hiddenInput.value = newValue;
// };
const authUpdatedHandler = function (e) {
    let authInfo = localStorage.getItem('authInfo')
    console.log(JSON.stringify(authInfo))
    const hiddenInput = document.getElementById('auth-storage');
    if (hiddenInput) {
        hiddenInput.value = JSON.stringify(authInfo);
    }
}

// document.addEventListener("authUpdate", localStorageSetHandler, false);
document.addEventListener("authUpdated", authUpdatedHandler, false);


// Add event listener to the window object
// window.addEventListener('storage', (event) => {
//   console.log("Storage event started -------")
//   // if (event.key === 'auth-info') {
//   //   // Get the new value from localStorage
//   //   console.log("---Matches auth-info")
//   //   const newValue = localStorage.getItem('auth-info');
//   //
//   //   // Update the hidden input field in the Dash layout with the new value
//   //   const hiddenInput = document.getElementById('output');
//   //   hiddenInput.value = newValue;
//   //
//   //   // Trigger the input's 'change' event to trigger the callback
//   //   hiddenInput.dispatchEvent(new Event('change'));
//   // } else {
//   //   console.log("-----other")
//   // }
// });