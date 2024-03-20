const userForm = document.getElementById("register-form");

const userUrl = "http://localhost:3000/tubekids/users";
const playlistUrl = "http://localhost:3000/tubekids/playlists";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordRepeatInput = document.getElementById("rep_password");
const pinInput = document.getElementById("pin");
const nameInput = document.getElementById("name");
const lastnameInput = document.getElementById("last_name");
const birthdateInput = document.getElementById("birthdate");
const countryInput = document.getElementById("country");


function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

userForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let today = new Date();
    let birthDate = new Date(birthdateInput.value);
    let age = today.getFullYear() - birthDate.getFullYear();
    let monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (passwordInput.value === passwordRepeatInput.value && isNumeric(parseInt(pinInput.value)) && age >= 18) {
        let res = await fetch(
            userUrl, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({email: emailInput.value, password: passwordInput.value, pin: parseInt(pinInput.value), name: nameInput.value, lastname: lastnameInput.value, birthdate: birthdateInput.value, country: countryInput.value})
            }
        );
        
        userId = res.json()._id;
        
        res = await fetch (
            playlistUrl, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({name: "General", userId: userId})
            }
        );

        console.log(await res.json());

    } else if (age < 18) {
        alert("You have to be over 18 to register in this site");
    } else {
        alert("The form has been filled incorrectly");
    }

})