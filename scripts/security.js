
const verifyUser = () => {
    const status = localStorage.getItem("admin");
    const userId = localStorage.getItem("userId");
    console.log(status + ", " + userId);

    if (status == "false" && userId && userId.length > 0) {
        if (window.location.href !="../pages/avatar-entry.html") {
            window.location.replace("../pages/avatar-entry.html");
        }
    } else if (!status && !userId){
        if (window.location.href !="../pages/login.html" && window.location.href !="../pages/register.html") {
            window.location.replace("../index.html");
        }
    }
}

const logout = () => {
    localStorage.clear();
    verifyUser();
  }

const partialLogOut = () => {
    localStorage.setItem("admin", false);
    verifyUser();
}