// Player class to represent a player on Spec F.C.
class Player {
    String name;
    int jerseyNumber;
    int rating;
    String position;

    public Player(String name, int jerseyNumber, int rating, String position) {
        this.name = name;
        this.jerseyNumber = jerseyNumber;
        this.rating = rating;
        this.position = position;
    }
}

public class SpecleGame {
    Player[] specFCRoster; // Array to hold Spec F.C. roster
    int attemptsLeft;
    Player correctPlayer;

    public SpecleGame() {
        // Initialize Spec F.C. roster
        specFCRoster = new Player[] {
            new Player("Player1", 10, 80, "Forward"),
            new Player("Player2", 5, 75, "Midfielder"),
            // Add more players here
        };
        attemptsLeft = 6;
        // Select a random player from the roster
        correctPlayer = specFCRoster[(int) (Math.random() * specFCRoster.length)];
    }

    public void play() {
        // Display UI and handle user input
        // Implement game logic here
        // Provide feedback to the user
        // Display results
    }

    // Other methods for game logic, user input handling, etc.
}
