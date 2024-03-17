const profiles = document.querySelectorAll('.profile');
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('close');

profiles.forEach(profile => {
  profile.addEventListener('click', () => {
    popup.style.display = 'block';
  });
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});