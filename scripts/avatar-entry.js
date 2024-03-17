const profiles = document.querySelectorAll('.profile');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');
const submitBtn = document.getElementById('submit-pin');

profiles.forEach(profile => {
  profile.addEventListener('click', () => {
    popup.style.display = 'block';

    const profileId = profile.id;
    popup.setAttribute('data-profile-id', profileId);
  });
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Handle PIN submission
submitBtn.addEventListener('click', () => {
  const enteredPIN = document.getElementById('pin').value;
  const profileId = popup.getAttribute('data-profile-id');

  console.log(enteredPIN + ", " + profileId);

  //send pin to backend
  }
);