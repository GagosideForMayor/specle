document.addEventListener('DOMContentLoaded', function() {
    var attemptsLeft = 6; // Initialize attempts left

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

    var playerDropdown = document.getElementById('player-dropdown');

    players.forEach(function(player) {
        var option = document.createElement('option');
        option.text = player.name;
        playerDropdown.add(option);
    });

    var attemptsCount = document.getElementById('attempts-count');
    attemptsCount.textContent = attemptsLeft;

    var submitButton = document.getElementById('submit-guess');
    submitButton.addEventListener('click', function() {
        var selectedPlayerName = playerDropdown.value;
        var selectedPlayer = players.find(function(player) {
            return player.name === selectedPlayerName;
        });

        comparePlayers(selectedPlayer);
        attemptsLeft--; // Decrement attempts left
        attemptsCount.textContent = attemptsLeft; // Update attempts left display

        if (attemptsLeft === 0) {
            // Disable dropdown and submit button if no attempts left
            playerDropdown.disabled = true;
            submitButton.disabled = true;
        }
    });

    function comparePlayers(selectedPlayer) {
        var correctPlayer = getCorrectPlayer();

        var feedbackDiv = document.getElementById('feedback');
        feedbackDiv.innerHTML = ''; // Clear previous feedback

        // Display the selected player's data
        var selectedPlayerData = document.createElement('div');
        selectedPlayerData.textContent = `Your guess: ${selectedPlayer.name}, Jersey Number: ${selectedPlayer.jerseyNumber}, Rating: ${selectedPlayer.rating}, Position: ${selectedPlayer.position}`;
        feedbackDiv.appendChild(selectedPlayerData);

        // Display feedback on each attribute
        displayAttributeFeedback('Jersey Number', selectedPlayer.jerseyNumber, correctPlayer.jerseyNumber, feedbackDiv);
        displayAttributeFeedback('Rating', selectedPlayer.rating, correctPlayer.rating, feedbackDiv);
        displayAttributeFeedback('Position', selectedPlayer.position, correctPlayer.position, feedbackDiv);
    }

    function displayAttributeFeedback(attributeName, selectedValue, correctValue, feedbackDiv) {
        var feedback = document.createElement('div');
        feedback.textContent = `${attributeName}: ${selectedValue} `;
        if (selectedValue < correctValue) {
            feedback.innerHTML += '&darr;'; // Arrow indicating lower value
        } else if (selectedValue > correctValue) {
            feedback.innerHTML += '&uarr;'; // Arrow indicating higher value
        }
        feedbackDiv.appendChild(feedback);
    }

    function getCorrectPlayer() {
        // This function should return the correct player object
        // You might use a random player from the players array as the correct player
        return players[Math.floor(Math.random() * players.length)];
    }
});
