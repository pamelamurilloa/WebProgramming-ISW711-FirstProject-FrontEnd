
const verifyUser = () => {
    const status = localStorage.getItem("admin");
    const userId = localStorage.getItem("userId");

    if (!status && userId) {
        window.location.replace("../pages/avatar-entry.html");
    } else if (!status && !userId){
        window.location.replace("../index.html");
    }
}

const logout = () => {
    localStorage.clear();
    window.location.replace("../index.html");
  }

const partialLogOut = () => {
    localStorage.setItem("admin", false);
    window.location.replace("../pages/avatar-entry.html");
}