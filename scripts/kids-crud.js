let userId = localStorage.getItem("userId");

const kidUrl = "http://localhost:3000/tubekids/kids";
const profiles = document.querySelectorAll('.profile');
const popup = document.getElementsByClassName('popup')[0];
const closeBtn = document.getElementById('close');

const profileImage = document.getElementsByClassName('profile-image')[0];
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

const title = document.getElementById("kid-form-title");

const kidForm = document.getElementById("submit-kid-changes");
const nameInput = document.getElementById("name");
const pinInput = document.getElementById("pin");
const ageInput = document.getElementById("age");
const kidId = document.getElementById("kidId");



closeBtn.addEventListener('click', () => {
popup.style.display = 'none';
});

const clearForm = () => {
    nameInput.value = "";
    pinInput.value = "";
    ageInput.value = "";
    
}

// Generate each card
const generateProfileCards = async () => {
    const profileGrid = document.getElementById('profile-grid');
    profileGrid.innerHTML = ''; // Clear existing content

    try {
        const res = await fetch(
            kidUrl + "/user/" + userId, 
            {
                method: 'GET',
            }
        )

        if (res.status === 200) {
            const profiles = await res.json();

            profiles.forEach(profile => {
                const profileCard = document.createElement('div');
                profileCard.classList.add('profile');
                profileCard.innerHTML = `
                    <div class="profile" id="${profile._id}">
                        <img src="../utils/images/profile${profile.avatar}.png" alt="Profile Avatar">
                        <div class="under-image">
                            <h3 class="profile-name">${profile.name}</h3>
                            <div class="profile-actions">
                                <a onclick="editProfile('${profile._id}')"><img class="icon modify edit" src="../utils/images/modify-icon.png"/></a>
                                <a onclick="deleteProfile('${profile._id}')"><img class="icon modify delete" src="../utils/images/delete-icon.png"/></a>
                            </div>
                        </div>
                    </div>
                `;

            profileGrid.appendChild(profileCard);
        });
        
        }
    } catch (err) {
        console.log("The user has no kids registered");
    }

    // Add the 'Add Profile' card
    const addProfileCard = document.createElement('div');
    addProfileCard.classList.add('profile');
    addProfileCard.innerHTML = `
            <div class="profile" >
                <img src="../utils/images/placeholder.png" onclick="addProfile()" alt="Add Profile">
                <div class="under-image">
                    <div class="profile-actions">
                        <a class="add-button" onclick="addProfile()"><h3>Add Profile</h3></a>
                    </div>
                </div>
            </div>
        `;
    profileGrid.appendChild(addProfileCard);
}


kidForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (title.innerHTML == "Register a child" && nameInput.value != "" && pinInput.value != "" && ageInput.value != "") {
        let imgNumberMatch = /(\d+)(?=\D*$)/.exec(profileImage.src);
        let avatar = imgNumberMatch[1];

        const res = await fetch(
            kidUrl, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({name: nameInput.value, pin: parseInt(pinInput.value), avatar: avatar, age: parseInt(ageInput.value), userId: userId})
            }
        )

        console.log(await res.json());
        popup.style.display = 'none';

        generateProfileCards();
    }
    else if (title.innerHTML != "Register a child") {
        let res = await fetch(
            kidUrl + "/" + kidId.value, 
            {
                method: 'GET',
            }
        );

        let kid = await res.json();

        let imgNumberMatch = /(\d+)(?=\D*$)/.exec(profileImage.src);
        let avatar = imgNumberMatch[1];

        kid.name = nameInput.value != "" ? nameInput.value : kid.name;
        kid.age = ageInput.value != "" ? ageInput.value : kid.age;
        kid.avatar = avatar != "" ? avatar : kid.avatar;
        kid.pin = pinInput.value != "" ? pinInput.value : kid.pin;

        res = await fetch(
            kidUrl + "/" + kid._id, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'PATCH',
                body: JSON.stringify({name: kid.name, pin: parseInt(kid.pin), avatar: kid.avatar, age: parseInt(kid.age), userId: userId})
            }
        )

        console.log( await res.json());
        popup.style.display = 'none';
    
        generateProfileCards();
    }
    
})

// Edits a profile
const editProfile = async (profileId) => {

    if (profileId) {
        const res = await fetch(
            kidUrl + "/" + profileId, 
            {
                method: 'GET'
            }
        )
        let profile = await res.json();

        profileImage.src = `../utils/images/profile${profile.avatar}.png`

        title.innerHTML = "Update child's data";
        nameInput.value = profile.name;
        ageInput.value = profile.age;
        pinInput.value = profile.pin;
        kidId.value = profileId;

        popup.style.display = 'block';
    };

}

// Deletes a profile
const deleteProfile = async (profileId) => {

    const res = await fetch(
        kidUrl + "/" + profileId, 
        {
            method: 'DELETE',
        }
    )
    console.log(res.json());
    generateProfileCards();
}

// Add a profile
const addProfile =() => {
    popup.style.display = 'block';
    title.innerHTML = "Register a child";
    profileImage.src = `../utils/images/profile1.png`;

}

// This area is for changing the profile picture

prevImage.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent page refresh
    let imgNumberMatch = /(\d+)(?=\D*$)/.exec(profileImage.src);
    let imgNumber = parseInt(imgNumberMatch[1]);
    if (imgNumber == 1) {
        profileImage.src = `../utils/images/profile9.png`;
    } else {
        profileImage.src = `../utils/images/profile${imgNumber - 1}.png`
    }
});

nextImage.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent page refresh
    let imgNumberMatch = /(\d+)(?=\D*$)/.exec(profileImage.src);
    let imgNumber = parseInt(imgNumberMatch[1]);
    console.log(imgNumber[length-1]+1);
    if (imgNumber == 9) {
        profileImage.src = `../utils/images/profile1.png`;
    } else {
        profileImage.src = `../utils/images/profile${imgNumber + 1}.png`
    }
});

// // Function to handle form submission
// const handleSubmit = () => {
//     const selectedImageId = currentImageIndex + 1;
//     alert(`Selected Image ID: ${selectedImageId}`);
    
// }

// Updating when the page loads
generateProfileCards();