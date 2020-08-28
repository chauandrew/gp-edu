export const createToast = (message) => {
    const x = document.createElement("div");
    x.className = "show snackbar";
    x.innerHTML = message;
    document.body.appendChild(x);
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

export default createToast;