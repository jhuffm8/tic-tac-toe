let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
let drawIndicator = getComputedStyle(document.body).getPropertyValue("--draw-blocks")

const x_text = "X";  // variable holding the x and o for players
const o_text = "O";
let current_player = x_text; // assigning first player as X 
let spaces = Array(9).fill(null);// creating an array of null type items
let count_plays = 0;

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked))  // this function loop over the div boxes and uses the boxClicked function to add null values over the items and once clicked give the current box the value of current player
}

function boxClicked(e) {
    const id = e.target.id; // this varible will hold the current id of the div box you are clicking on 

    if(!spaces[id] && count_plays < 9){         // this if statement is checkin gto see if id is equal to null and if it is fill that current box with the current players X or O
        spaces[id] = current_player;
        e.target.innerText = current_player;

        if(playerWon() !== false){
            playerText.innerHTML = `${current_player} has won!`
            let winning_blocks = playerWon();
            count_plays = 10;
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return


         }
         count_plays++;
        current_player = current_player == x_text ? o_text : x_text;  // this logic check to see if current player is x and if so change to o after click and if it is o switch current player back to x
    }
    if(count_plays === 9){

        playerText.innerHTML = "Draw Game!";
        boxes.forEach(box => box.style.color = drawIndicator)
    }
}

const winningCombo = [ // create the logic for the winning combo
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function playerWon(){ // function checks if any winning combo had been matched
    for (const condition of winningCombo) {
        let [a,b,c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
            return [a,b,c];

        }
    }
    return false;

}

restartBtn.addEventListener("click", restart)

function restart(){  // resets the entire game 
    spaces.fill(null);
    count_plays = 0;

    boxes.forEach( box => {
        box.innerText = "";
        box.style.backgroundColor = "";
        box.style.color = "#4ed9f2";
    })

    playerText.innerHTML = "Tic Tac Toe";

    current_player = x_text;
}


startGame();