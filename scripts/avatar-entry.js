const profiles = document.querySelectorAll('.profile');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');
const submitBtn = document.getElementById('submit-pin');
const kidUrl = "http://localhost:3000/tubekids/kids";
const userUrl = "http://localhost:3000/tubekids/users";

const userId = localStorage.getItem("userId");

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
  const profiles = await res.json();

  if (res.status === 200)
    profiles.forEach(profile => {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile');
        profileCard.innerHTML = `
            <div class="profile" id="${profile._id}">
                <img src="../utils/images/profile${profile.avatar}.png" onclick="insertPin('${profile._id}')" alt="Profile Avatar">
                <div class="under-image">
                    <h3 class="profile-name">${profile.name}</h3>
                </div>
            </div>
        `;
    

      profileGrid.appendChild(profileCard);
  })
  } catch (err) {
    console.log("The user has no kids registered");
  }
}

const insertPin = async (profileId, admin = false) => {
  popup.style.display = 'block';
  popup.setAttribute('data-profile-id', profileId);
  if (admin) {
    popup.setAttribute('admin-status', true);

  }

}

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  popup.setAttribute('data-profile-id', "");

});

// Handle PIN submission
submitBtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  const enteredPIN = document.getElementById('pin').value;
  const profileId = popup.getAttribute('data-profile-id');
  const status = popup.getAttribute('admin-status');
  const profilePin = localStorage.getItem("userPin");

  if (status == "true") {
    if (enteredPIN == profilePin) {
      window.location.replace("administration.html");
    } else {
      alert("Incorrect pin");
    }
  }
  else {
      const res = await fetch(
      kidUrl + "/compare/"+ profileId +"/" + enteredPIN, 
      {
          method: 'GET',
      });

      let kid = await res.json();

      if (res.status == 200) {
        localStorage.setItem("kidId", kid._id);
        window.location.href = "../pages/front-page.html";
      } else {
          alert("Incorrect pin");
      }
  }
  
});

generateProfileCards();