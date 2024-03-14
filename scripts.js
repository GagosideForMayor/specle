document.addEventListener('DOMContentLoaded', function() {
    var attemptsLeft = 6;
    var players = [
        { name: "Govin G", jerseyNumber: 0, position: ["DEF", "MID", "FWD"], rating: 83 },
        { name: "Ethan M", jerseyNumber: 1, position: ["GK"], rating: 85 },
        { name: "Cooper B", jerseyNumber: 5, position: ["DEF"], rating: 80 },
        { name: "Eashan K", jerseyNumber: 6, position: ["DEF"], rating: 78 },
        { name: "Liang Yu T", jerseyNumber: 7, position: ["MID", "FWD"], rating: 82 },
        { name: "Nikush R", jerseyNumber: 9, position: ["DEF"], rating: 75 },
        { name: "Ryan C", jerseyNumber: 13, position: ["DEF", "MID", "FWD"], rating: 82 },
        { name: "Camillo V", jerseyNumber: 16, position: ["FWD"], rating: 85 },
        { name: "Ryan H", jerseyNumber: 17, position: ["MID", "FWD"], rating: 86 },
        { name: "Oskar B", jerseyNumber: 20, position: ["FWD"], rating: 83 },
        { name: "Cashel C", jerseyNumber: 21, position: ["GK", "CB", "FWD"], rating: 78 },
        { name: "Lochlan F", jerseyNumber: 22, position: ["DEF"], rating: 85 },
        { name: "Bobby F", jerseyNumber: 24, position: ["CB"], rating: 81 },
        { name: "Sebastian D", jerseyNumber: 26, position: ["MID", "FWD"], rating: 81 },
        { name: "Areeb J", jerseyNumber: 28, position: ["FWD"], rating: 85 },
        { name: "Daniel N", jerseyNumber: 35, position: ["MID", "FWD"], rating: 85 },
        { name: "Ricardo C", jerseyNumber: 72, position: ["DEF", "MID"], rating: 86 },
        { name: "Yi-Jay K", jerseyNumber: 95, position: ["DEF", "MID"], rating: 82 },
        { name: "Mori N", jerseyNumber: 111, position: ["MID", "FWD"], rating: 85 },
        { name: "Dani M", jerseyNumber: 33, position: ["MID", "FWD"], rating: 91 },
        { name: "Leo R", jerseyNumber: 30, position: ["DEF"], rating: 85 }
    ];

    var playerDropdown = document.getElementById('player-dropdown');
    var attemptsCount = document.getElementById('attempts-count');
    var feedbackDiv = document.getElementById('feedback');
    var mysteryPlayer = getCorrectPlayer(); // Select the mystery player
    var sortButton = document.getElementById('sort-button');
    var sortByJersey = false;

    // Sort players array alphabetically by name
    players.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    // Function to split players with multiple positions
    var expandedPlayers = [];
    players.forEach(function(player) {
        player.position.forEach(function(pos) {
            expandedPlayers.push({
                name: player.name,
                jerseyNumber: player.jerseyNumber,
                position: pos,
                rating: player.rating
            });
        });
    });

    // Function to sort players by jersey number
    function sortPlayersByJersey() {
        sortByJersey = !sortByJersey;
        if (sortByJersey) {
            players.sort(function(a, b) {
                return a.jerseyNumber - b.jerseyNumber;
            });
        } else {
            players.sort(function(a, b) {
                return a.name.localeCompare(b.name);
            });
        }
        populateDropdown();
    }

    // Populate the dropdown menu with player options
    function populateDropdown() {
        playerDropdown.innerHTML = ''; // Clear existing dropdown
        if (sortByJersey) {
            players.forEach(function(player) {
                var option = document.createElement('option');
                option.text = `${player.name} - #${player.jerseyNumber}`;
                playerDropdown.add(option);
            });
        } else {
            players.forEach(function(player) {
                var option = document.createElement('option');
                option.text = player.name;
                playerDropdown.add(option);
            });
        }
    }

    populateDropdown(); // Initial population of dropdown

    // Event listener for sorting button
    sortButton.addEventListener('click', sortPlayersByJersey);

    // Event listener for the submit button
    var submitButton = document.getElementById('submit-guess');
    submitButton.addEventListener('click', function() {
        if (attemptsLeft > 0) {
            var selectedPlayerName = playerDropdown.value;
            var selectedPlayer = expandedPlayers.find(function(player) {
                return player.name === selectedPlayerName;
            });

            comparePlayers(selectedPlayer);
            attemptsLeft--; // Decrement attempts left
            attemptsCount.textContent = attemptsLeft; // Update attempts left display

            if (attemptsLeft === 0) {
                disableGame(); // Disable dropdown and submit button if no attempts left
            }
        }
    });

    function comparePlayers(selectedPlayer) {
        feedbackDiv.innerHTML = ''; // Clear previous feedback

        // Display the selected player's data
        var selectedPlayerData = document.createElement('div');
        selectedPlayerData.textContent = `Your guess: ${selectedPlayer.name}, Jersey Number: ${selectedPlayer.jerseyNumber}, Rating: ${selectedPlayer.rating}, Position: ${selectedPlayer.position}`;
        feedbackDiv.appendChild(selectedPlayerData);

        // Check if the selected player is the mystery player
        if (selectedPlayer.name === mysteryPlayer.name) {
            revealMysteryPlayer();
            disableGame();
        } else {
            var loseMessage = document.createElement('div');
            loseMessage.textContent = `You lose! The correct player was: ${mysteryPlayer.name}`;
            feedbackDiv.appendChild(loseMessage);
        }
    }

    function revealMysteryPlayer() {
        var revealMessage = document.createElement('div');
        revealMessage.textContent = `You win! The mystery player is: ${mysteryPlayer.name}`;
        feedbackDiv.appendChild(revealMessage);
    }

    function disableGame() {
        playerDropdown.disabled = true;
        submitButton.disabled = true;
    }

    // Reset the game
    var tryAgainButton = document.getElementById('try-again-button');
    tryAgainButton.addEventListener('click', function() {
        attemptsLeft = 6;
        attemptsCount.textContent = attemptsLeft; // Reset attempts left display
        playerDropdown.disabled = false; // Enable dropdown
        submitButton.disabled = false; // Enable submit button
        feedbackDiv.innerHTML = ''; // Clear feedback
        mysteryPlayer = getCorrectPlayer(); // Select a new mystery player
        populateDropdown(); // Re-populate dropdown
    });

    // Function to get a random player as the mystery player
    function getCorrectPlayer() {
        return expandedPlayers[Math.floor(Math.random() * expandedPlayers.length)];
    }
});
