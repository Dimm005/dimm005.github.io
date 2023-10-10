(game())

function getComputerChoice () {
    let intChoice = Math.floor(Math.random() * 3);
    switch (intChoice) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
        default:
            return 'Choice Error!';
    }
}

function getPlayerChoice (choiceId) {
    switch (choiceId) {
        case "rock_btn": {
            playerChoice = "rock";
            break;
        };
        case "paper_btn": {
            playerChoice = "paper";
            break;
        };
        case "scissors_btn": {
            playerChoice = "scissors";
            break;
        };
        default: playerChoice = "something wrong!";
    };
    return playerChoice;
}

function playRound (choiceId) {

    const playerChoiceDiv = document.querySelector("#player_choice");
    const computerChoiceDiv = document.querySelector("#computer_choice");

    let playerSelection = getPlayerChoice(choiceId);
    let computerSelection = getComputerChoice();

    playerChoiceDiv.textContent = playerSelection;
    computerChoiceDiv.textContent = computerSelection;

    switch (playerSelection) {
        case 'rock':
            if (computerSelection == 'rock') {
                return 0;
            } else if (computerSelection == 'paper') {
                return 2;
            } else {
                return 1;
            };
        case 'paper':
            if (computerSelection == 'paper') {
                return 0;
            } else if (computerSelection == 'scissors') {
                return 2;
            } else {
                return 1;
            };
        default:
            if (computerSelection == 'scissors') {
                return 0;
            } else if (computerSelection == 'rock') {
                return 2;
            } else {
                return 1;
            };

    };
};



function game() {

    const mainBlock = document.querySelector('main');
    const round = document.querySelector("#round_result");
    const playerScoreSpan = document.querySelector("#player_total span");
    const computerScoreSpan = document.querySelector("#computer_total span");
    const choiceBtn = document.querySelectorAll(".choice_btn");
    const gameOver = document.createElement("div");
    gameOver.id = "game_over";

    let playerScore = 0;
    let computerScore = 0;

    choiceBtn.forEach((button) => {

        button.addEventListener("click", () => {
            let roundResult = playRound(button.id);
            gameOver.textContent = "";

            switch (roundResult) {
                case 1:
                    playerScore++;
                    round.textContent = "You won the round!";
                    break;
                case 2:
                    computerScore++;
                    round.textContent = "You lose the round!";
                    break;
                default:
                    round.textContent = "Draw!";
            };

            playerScoreSpan.textContent = playerScore;
            computerScoreSpan.textContent = computerScore;

            if (playerScore == 5) {
                gameOver.textContent = "You won the battle!";
                mainBlock.appendChild(gameOver);
                playerScore = 0;
                computerScore = 0;
                return;
            };
            if (computerScore == 5) {
                gameOver.textContent = "You lose the battle!";
                mainBlock.appendChild(gameOver);
                playerScore = 0;
                computerScore = 0;
                return;
            };
        });
    });

};




