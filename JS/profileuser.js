// Select elements from the DOM
const profileInput = document.getElementById('profileInput');
const backgroundInput = document.getElementById('fileBackground');
const profileContainer = document.querySelector('.change-picture');
const backgroundContainer = document.querySelector('.bg');
const nameDisplay = document.querySelector('.name_user');

// Load images and name from localStorage on page load
window.addEventListener('load', () => {
    const storedProfileImage = localStorage.getItem('profileImage');
    const storedBackgroundImage = localStorage.getItem('backgroundImage');
    const storedName = localStorage.getItem('userName');

    if (storedProfileImage) {
        profileContainer.style.backgroundImage = `url(${storedProfileImage})`;
        profileContainer.style.backgroundSize = 'cover';
        profileContainer.style.backgroundPosition = 'center';
    }

    if (storedBackgroundImage) {
        backgroundContainer.style.backgroundImage = `url(${storedBackgroundImage})`;
        backgroundContainer.style.backgroundSize = 'cover';
        backgroundContainer.style.backgroundPosition = 'center';
    }

    if (storedName) {
        nameDisplay.textContent = storedName;
    }
});

// Allow user to update the name
nameDisplay.addEventListener('click', () => {
    const newName = prompt('Enter your name:', nameDisplay.textContent);
    if (newName && newName.trim() !== '') {
        nameDisplay.textContent = newName.trim();
        localStorage.setItem('userName', newName.trim());
    } else {
        alert('Please enter a valid name.');
    }
});

// Handle profile picture upload
profileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            profileContainer.style.backgroundImage = `url(${imageUrl})`;
            profileContainer.style.backgroundSize = 'cover';
            profileContainer.style.backgroundPosition = 'center';
            localStorage.setItem('profileImage', imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
});

// Handle background image upload
backgroundInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            backgroundContainer.style.backgroundImage = `url(${imageUrl})`;
            backgroundContainer.style.backgroundSize = 'cover';
            backgroundContainer.style.backgroundPosition = 'center';
            localStorage.setItem('backgroundImage', imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a valid image file.');
    }
});

// Trigger file input clicks
document.getElementById('selectProfileImage').addEventListener('click', () => {
    profileInput.click();
});

document.getElementById('selectBackground').addEventListener('click', () => {
    backgroundInput.click();
});