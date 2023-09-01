 

// selecting all required elements
const selectBox = document.querySelector(".select-box");
const selectXbtn = selectBox.querySelector(".playerX");
const selectObtn = selectBox.querySelector(".playerO");

const playBoard = document.querySelector(".play-board");
const allBox = document.querySelectorAll("section span"); // selecting section's span.
const players = document.querySelector(".players");

const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");


window.onload = () => { // once window loaded
    for(let i = 0 ; i<allBox.length ; i++){ // adding onclick, onmousedown, onmouseup attributes in all available section's spans.
        allBox[i].setAttribute("onclick", "clickedBox(this)");
        allBox[i].setAttribute("onmousedown", "mouseDown(this)");
        allBox[i].setAttribute("onmouseup", "mouseUp(this)");
    }

    selectXbtn.onclick = ()=>{
        selectBox.classList.add("hide"); // hide the select-box on playerX clicked
        playBoard.classList.add("show"); // show the playboard section on playerX button clicked
    }
    selectObtn.onclick = ()=>{
        selectBox.classList.add("hide"); // hide the select-box on playerO clicked
        playBoard.classList.add("show"); // show the playboard section on playerO button clicked
        players.setAttribute("class", "players active player"); // adding three class names in player element
    }
}

let playerXicon = "fas fa-times"; // class name of fontawesome cross icon
let playerOicon = "far fa-circle"; // class name of fontawesome circle icon
let playerSign = "X"; // suppose player will be X
let runBot = true;

// user click function starts
function clickedBox(element){
    if(players.classList.contains("player")){// if players element has contains .player
        element.innerHTML = `<i class="${playerOicon}"></i>`; // adding circle icon tag inside user clicked element.
        players.classList.remove("active");
        // if player will be O then we'll change the sign
        playerSign = "O"; 
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXicon}"></i>`; // adding cross icon tag inside user clicked element.
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // calling the winner function to check if player is winner or not.
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; // once user select any box then box can't be selected again.
    let randomDelayTime = ((Math.random()*1000) + 200).toFixed(); // generating random time delay so bot will dalay randomly to select box
    setTimeout(()=>{
        bot(runBot); // calling bot function
    }, randomDelayTime); // passing random delay time
}
// user click function ends

function mouseDown(element){
    element.style.scale = '0.9';
}

function mouseUp(element){
    element.style.scale = '1';
}


// bot click function starts
function bot(runBot){
    if(runBot){ // if runBot is true then run the following code.
        // first change the playerSign... so if user has X value in id then bot will have O
        playerSign = "O";
        let array = []; // creationg empty array.. we'll store unselected box index in this array.
        for(let i = 0; i<allBox.length; i++){
            if(allBox[i].childElementCount == 0){ // if span has no any child element.
                array.push(i); // inserting unclicked or unselected boxes inside array means that span has no children.
            }
        }

        let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select random unselected box.

        if(array.length > 0){
            if(players.classList.contains("player")){
                allBox[randomBox].innerHTML = `<i class="${playerXicon}"></i>`; // adding cross icon tag by the bot if circle is selected by user
                players.classList.add("active");
                // if user is O then the box id value will be X
                playerSign = "X";
                allBox[randomBox].setAttribute("id", playerSign);
            }else{
                allBox[randomBox].innerHTML = `<i class="${playerOicon}"></i>`; // adding circle icon tag by the bot if cross is selecred by user
                players.classList.remove("active");
                allBox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner(); // calling the winner function to check if bot is winner or not.
        }
        allBox[randomBox].style.pointerEvents = "none"; // once bot select any box then user can't select or click on that box
        playBoard.style.pointerEvents = "auto";
        playerSign = "X"; // passing the X value
    }
}
// bot click function ends


// let work on select the winner
function getID(idname){
    return document.querySelector(".box" + idname).id; // returning id name
}

function checkThreeIDs(val1, val2, val3, sign){ // checking id of boxes is equal to the playerSign or not.
    if(getID(val1) == sign && getID(val2) == sign && getID(val3) == sign){
        return true;
    }
}

function selectWinner(){ // if one combination of them matched then select the winner
    if(checkThreeIDs(1,2,3,playerSign) || checkThreeIDs(4,5,6,playerSign) || checkThreeIDs(7,8,9,playerSign) || checkThreeIDs(1,4,7,playerSign) ||checkThreeIDs(2,5,8,playerSign) || checkThreeIDs(3,6,9,playerSign) || checkThreeIDs(3,5,7,playerSign) || checkThreeIDs(1,5,9,playerSign) ){
        // console.log(playerSign + " " + "is the winner");
        // once match won by someone then stop the bot
        runBot = false;
        bot(runBot);

        setTimeout(()=>{ // we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;

        // let show the result box with winner sign
    }
    else{
        // if match has drawn
        // first we'll check all id... if all span has id and no one won the game then we'll draw the game
        if(getID(1) != "" && getID(2) != "" && getID(3) != "" && getID(4) != "" && getID(5) != "" && getID(6) != "" && getID(7) != "" && getID(8) != "" && getID(9) != ""){
            runBot = false;
            bot(runBot);
    
            setTimeout(()=>{ // we'll delay to show result box
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },700);
    
            wonText.textContent = `Match has been drawn!`;
        }
    }
}

replayBtn.onclick = () =>{
    window.location.reload(); // reload the current page
}