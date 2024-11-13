// Add this at the top of script.js
const texts = ["NTUCraft", "NTU's Official Minecraft Server"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingElement = document.querySelector('.typing-text');

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    // Typing speed
    let typeSpeed = isDeleting ? 50 : 100;

    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeText, typeSpeed);
}

// Start the typing animation
typeText();

async function updatePlayerCount() {
    try {
        // Updated to use your server IP
        const response = await fetch('https://api.allorigins.win/raw?url=https://api.mcsrvstat.us/2/88.211.236.228:25672');
        const data = await response.json();
        
        const playerCountElement = document.querySelector('.player-count');
        
        if (data.online) {
            const currentPlayers = data.players?.online || 0;
            playerCountElement.textContent = `Players Online: ${currentPlayers}`;
        } else {
            playerCountElement.textContent = 'Players Online: 0';
        }
    } catch (error) {
        console.error('Error fetching player count:', error);
        const playerCountElement = document.querySelector('.player-count');
        playerCountElement.textContent = 'Players Online: 0';
    }
}

// Update count every 30 seconds
updatePlayerCount();
setInterval(updatePlayerCount, 30000); 