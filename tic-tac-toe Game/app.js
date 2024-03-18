let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let score = document.querySelector("#score");

let turnO = true;//playerX, playerO

let O = 0;
let X = 0;

let winPatterns= [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const newGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    X = 0;
    O = 0;
    score.innerText = `X - ${X} & O - ${O}`;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    };
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    };
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations Winner is ${winner}`;
    score.innerText = `X - ${X} & O - ${O}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let draw = true;
    for(let pattern of winPatterns){
        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "" ){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                if(pos1Val === "X"){
                    X++;
                }
                else{
                    O++;
                };
                showWinner(pos1Val);
                return;
            };
        }else {
            draw = false;
        };
    };

    if(draw) {
        msg.innerText = "It is a draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", newGame);
resetBtn.addEventListener("click", resetGame);