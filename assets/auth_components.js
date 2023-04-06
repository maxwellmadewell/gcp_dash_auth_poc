let __user_credentials_setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;

const loginHandler = function (e) {
    let loginNode = document.getElementById('user-bridge-node');
    if (loginNode) {
        let loginValue = localStorage.getItem('userInfoStorage')
        __user_credentials_setter.call(loginNode, loginValue);
        const evli = new Event('input', {bubbles: true})
        loginNode.dispatchEvent(evli)
    } else {
        console.log("[loginHandler] - loginNode null")
    }
}

const logoutHandler = function (e) {
    console.log('[logoutHandler] -  Started')
    let logoutNode = document.getElementById('user-bridge-node')

    if (logoutNode) {
        console.log("[logoutHandler] - logoutNode not null")
        let logoutValue = localStorage.getItem('userInfoStorage')
        __user_credentials_setter.call(logoutNode, logoutValue);
        var evlo = new Event('input', {bubbles: true})
        logoutNode.dispatchEvent(evlo)
    } else {
        console.log("[logoutHandler] - log  outNode null")
    }
}

const elementLoaded = new Promise((resolve) => {
  const checkElement = () => {
    const element = document.getElementById('user-bridge-node');
    if (element) {
      resolve(element);
    } else {
      window.requestAnimationFrame(checkElement);
    }
  };
  window.requestAnimationFrame(checkElement);
});

elementLoaded.then((element) => {
    document.addEventListener("login", loginHandler, false);
    document.addEventListener("logout", logoutHandler, false);
});

