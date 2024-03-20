const userForm = document.getElementById("login-form");

const userUrl = "http://localhost:3000/tubekids/users";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await fetch(
        userUrl + "/"+ emailInput.value +"/" +passwordInput.value, 
        {
            method: 'GET',
        }
    )

    if (res.status === 200) {
        user = res.json();
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userPin", user.pin);
        window.location.href = "avatar-entry.html";
    } else {
        alert("El usuario o la contraseña están incorrectos");
    }

})