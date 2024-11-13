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
        // Use a CORS proxy that's more reliable for GitHub Pages
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.mcsrvstat.us/2/88.211.236.228:25672', {
            headers: {
                'Origin': 'https://waruskr.github.io'  // Replace with your actual GitHub Pages URL
            }
        });
        const data = await response.json();
        
        console.log('Server data:', data);  // Keep this for debugging
        
        const playerCountElement = document.querySelector('.player-count');
        const playerList = document.querySelector('.player-list');
        
        if (data.online) {
            const currentPlayers = data.players?.online || 0;
            playerCountElement.textContent = `Players Online: ${currentPlayers}`;

            // Check if we have the list and it's not empty
            if (data.players?.list && data.players.list.length > 0) {
                playerList.innerHTML = data.players.list
                    .map(player => `<span class="online-player">${player}</span>`)
                    .join('');
            } else {
                // If no list is provided but players are online
                playerList.innerHTML = `<span class="online-player">Players Online</span>`;
            }
        } else {
            playerCountElement.textContent = 'Players Online: 0';
            playerList.innerHTML = '';
        }
    } catch (error) {
        console.error('Error fetching player count:', error);
        const playerCountElement = document.querySelector('.player-count');
        playerCountElement.textContent = 'Players Online: 0';
        document.querySelector('.player-list').innerHTML = '';
    }
}

// Update count every 30 seconds
updatePlayerCount();
setInterval(updatePlayerCount, 30000);
  