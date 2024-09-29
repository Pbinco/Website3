// Get all popup elements
const popupGhostTrain = document.getElementById('popup-ghost-train');
const popupBigRipper = document.getElementById('popup-big-ripper');

// Get buttons to open popups
const btnGhostTrain = document.getElementById('btn-ghost-train');
const btnBigRipper = document.getElementById('btn-big-ripper');

// Get buttons to close popups
const closeButtons = document.querySelectorAll('.close-popup');

// Function to open popup with 3D animation and load content dynamically
function openPopup(popup, url) {
    popup.classList.add('popup-active');
    popup.setAttribute('aria-hidden', 'false');
    loadPopupContent(popup, url);
}

// Function to close popup with animation
function closePopup(popup) {
    popup.classList.remove('popup-active');
    popup.setAttribute('aria-hidden', 'true');
}

// Event listeners to open popups
btnGhostTrain.addEventListener('click', () => {
    openPopup(popupGhostTrain, 'ghost-train-info.html');
});

btnBigRipper.addEventListener('click', () => {
    openPopup(popupBigRipper, 'big-ripper-info.html');
});

// Event listeners to close popups
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        closePopup(popupGhostTrain);
        closePopup(popupBigRipper);
    });
});

// Close popup on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        closePopup(e.target);
    }
});

// Swipe to close on touch devices
let touchStartX = 0;
let touchEndX = 0;

document.body.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.body.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX) {
        closePopup(popupGhostTrain);
        closePopup(popupBigRipper);
    }
});

// Function to dynamically load content using AJAX
function loadPopupContent(popup, url) {
    const popupContent = popup.querySelector('p');
    fetch(url)
        .then(response => response.text())
        .then(data => {
            popupContent.innerHTML = data;
        })
        .catch(error => {
            popupContent.innerHTML = 'Error loading content. Please try again.';
        });
}

// Add mousemove event for parallax effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    document.getElementById('background-image').style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.1)`;
});

// Add voice command functionality (using Speech Recognition API)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('Voice recognition started.');
};

recognition.onresult = function (event) {
    const voiceCommand = event.results[0][0].transcript.toLowerCase();
    if (voiceCommand.includes('ghost train')) {
        openPopup(popupGhostTrain, 'ghost-train-info.html');
    } else if (voiceCommand.includes('big ripper')) {
        openPopup(popupBigRipper, 'big-ripper-info.html');
    }
};

// Activate voice recognition on button click
document.body.addEventListener('keydown', (e) => {
    if (e.key === 'v') {
        recognition.start();
    }
});
