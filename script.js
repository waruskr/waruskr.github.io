async function updatePlayerCount() {
    try {
        // Using a CORS proxy to bypass SSL issues
        const response = await fetch('https://api.allorigins.win/raw?url=https://api.mcsrvstat.us/2/mp.applecraft.org');
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