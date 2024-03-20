document.addEventListener('DOMContentLoaded', function() {
    var attemptsLeft = 6;
    var players = [
        { name: "Govin G", jerseyNumber: 0, position: "DEF/MID/FWD", rating: 83 },
        { name: "Ethan M", jerseyNumber: 1, position: "GK", rating: 85 },
        { name: "Cooper B", jerseyNumber: 5, position: "DEF", rating: 80 },
        { name: "Eashan K", jerseyNumber: 6, position: "DEF", rating: 78 },
        { name: "Liang Yu T", jerseyNumber: 7, position: "MID/FWD", rating: 82 },
        { name: "Nikush R", jerseyNumber: 9, position: "DEF", rating: 75 },
        { name: "Ryan C", jerseyNumber: 13, position: "DEF/MID/FWD", rating: 82 },
        { name: "Camillo V", jerseyNumber: 16, position: "FWD", rating: 85 },
        { name: "Ryan H", jerseyNumber: 17, position: "MID/FWD", rating: 86 },
        { name: "Oskar B", jerseyNumber: 20, position: "FWD", rating: 83 },
        { name: "Cashel C", jerseyNumber: 21, position: "GK/CB/FWD", rating: 78 },
        { name: "Lochlan F", jerseyNumber: 22, position: "DEF", rating: 85 },
        { name: "Bobby F", jerseyNumber: 24, position: "CB", rating: 81 },
        { name: "Sebastian D", jerseyNumber: 26, position: "MID/FWD", rating: 81 },
        { name: "Areeb J", jerseyNumber: 28, position: "FWD", rating: 85 },
        { name: "Daniel N", jerseyNumber: 35, position: "MID/FWD", rating: 85 },
        { name: "Ricardo C", jerseyNumber: 72, position: "DEF/MID", rating: 86 },
        { name: "Yi-Jay K", jerseyNumber: 95, position: "DEF/MID", rating: 82 },
        { name: "Mori N", jerseyNumber: 111, position: "MID/FWD", rating: 85 },
        { name: "Dani M", jerseyNumber: 33, position: "MID/FWD", rating: 91 },
        { name: "Leo R", jerseyNumber: 30, position: "DEF", rating: 85 }
    ];

    // Sort players array alphabetically by name
    players.sort(function(a, b) {
        return a.name.localeCompare(b.name);
    });

    var playerDropdown = document.getElementById('player-dropdown');
    var attemptsCount = document.getElementById('attempts-count');
    var feedbackDiv = document.getElementById('feedback');
    var mysteryPlayer = getCorrectPlayer(); // Select the mystery player

    // Populate the dropdown menu with player options
    players.forEach(function(player) {
        var option = document.createElement('option');
        option.text = player.name;
        playerDropdown.add(option);
    });

    // Event listener for the submit button
    var submitButton = document.getElementById('submit-guess');
    submitButton.addEventListener('click', function() {
        if (attemptsLeft > 0) {
            var selectedPlayerName = playerDropdown.value;
            var selectedPlayer = players.find(function(player) {
                return player.name === selectedPlayerName;
            });

            comparePlayers(selectedPlayer);
            attemptsLeft--; // Decrement attempts left
            attemptsCount.textContent = attemptsLeft; // Update attempts left display

            // Check if the selected player is the mystery player
            if (selectedPlayer.name === mysteryPlayer.name) {
                var winMessage = document.createElement('div');
                winMessage.textContent = 'You win!';
                feedbackDiv.appendChild(winMessage);
                revealMysteryPlayer();
                disableGame();
            }

            if (attemptsLeft === 0 && selectedPlayer.name !== mysteryPlayer.name) {
                var loseMessage = document.createElement('div');
                loseMessage.textContent = `You lose! The correct player was: ${mysteryPlayer.name}`;
                feedbackDiv.appendChild(loseMessage);
                disableGame();
            }
        }
    });

    function comparePlayers(selectedPlayer) {
        feedbackDiv.innerHTML = ''; // Clear previous feedback

        // Display the selected player's data
        var selectedPlayerData = document.createElement('div');
        selectedPlayerData.textContent = `Your guess: ${selectedPlayer.name}, Jersey Number: ${selectedPlayer.jerseyNumber}, Rating: ${selectedPlayer.rating}, Position: ${selectedPlayer.position}`;
        feedbackDiv.appendChild(selectedPlayerData);

        // Display feedback on each attribute
        displayAttributeFeedback('Jersey Number', selectedPlayer.jerseyNumber, mysteryPlayer.jerseyNumber, feedbackDiv);
        displayAttributeFeedback('Rating', selectedPlayer.rating, mysteryPlayer.rating, feedbackDiv);
        displayAttributeFeedback('Position', selectedPlayer.position, mysteryPlayer.position, feedbackDiv);

        // Add line breaks after each attribute display
        feedbackDiv.innerHTML += '<br>'.repeat(3);
    }

    function displayAttributeFeedback(attributeName, selectedValue, correctValue, feedbackDiv) {
        var feedback = document.createElement('div');
        feedback.textContent = `${attributeName}: ${selectedValue} `;
        if (attributeName !== 'Position') {
            if (selectedValue < correctValue) {
                feedback.innerHTML += '&uarr;'; // Arrow indicating higher value
            } else if (selectedValue > correctValue) {
                feedback.innerHTML += '&darr;'; // Arrow indicating lower value
            } else {
                feedback.innerHTML += '&#10004;'; // Checkmark for correct value
            }
        } else {
            if (selectedValue === correctValue) {
                feedback.innerHTML += '&#10004;'; // Checkmark for correct position
            } else {
                feedback.innerHTML += '&#10060;'; // Crossmark for incorrect position
            }
        }
        feedbackDiv.appendChild(feedback);
    }

    function getCorrectPlayer() {
        return players[Math.floor(Math.random() * players.length)];
    }

    function revealMysteryPlayer() {
        var revealMessage = document.createElement('div');
        revealMessage.textContent = `The mystery player is: ${mysteryPlayer.name}`;
        feedbackDiv.appendChild(revealMessage);
    }

    function disableGame() {
    playerDropdown.disabled = true;
    submitButton.disabled = true;
    var tryAgainButton = document.createElement('button');
    tryAgainButton.textContent = 'Try Again';
    tryAgainButton.id = 'try-again-button'; // Add an ID to the button
    tryAgainButton.addEventListener('click', function() {
        resetGame();
    });
    feedbackDiv.appendChild(tryAgainButton);
}
    
    function resetGame() {
        attemptsLeft = 6;
        attemptsCount.textContent = attemptsLeft; // Reset attempts left display
        playerDropdown.disabled = false; // Enable dropdown
        submitButton.disabled = false; // Enable submit button
        feedbackDiv.innerHTML = ''; // Clear feedback
        mysteryPlayer = getCorrectPlayer(); // Select a new mystery player
    }
});

