const userId = "65fa852db94c1e6a89608399";
const apiUrl = "http://localhost:3000/tubekids/kids";
const profiles = document.querySelectorAll('.profile');
const popup = document.getElementsByClassName('popup')[0];
const closeBtn = document.getElementById('close');
const profileImage = document.getElementsByClassName('profile-image')[0];
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');

closeBtn.addEventListener('click', () => {
popup.style.display = 'none';
});

// Generate each card
const generateProfileCards = async () => {
    const profileGrid = document.getElementById('profile-grid');
    profileGrid.innerHTML = ''; // Clear existing content

    const res = await fetch(
        apiUrl + "/user/" + userId, 
        {
            method: 'GET',
        }
    )
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

// Edits a profile
const editProfile = async (profileId) => {
    alert("Edit profile with ID: " + profileId);

    if (profileId) {
        const res = await fetch(
            apiUrl + "/" + profileId, 
            {
                method: 'GET'
            }
        )
        let profile = await res.json();

        profileImage.src = `../utils/images/profile${profile.avatar}.png`
        popup.style.display = 'block';
    };

    
}

// Deletes a profile
const deleteProfile = (profileId) => {
    alert("Delete profile with ID: " + profileId);
}

// Add a profile
const addProfile =() => {
    alert("Add new profile");
    popup.style.display = 'block';
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