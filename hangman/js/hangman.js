var selectedWord = "";
var selectedHint ="";
var board=[];
var remainingGuesses = 6;
var words =[{word:"snake", hint:"It's a reptile"},{word:"monkey",hint: "It's a mammal"},{word:"beetle",hint:"It's an insect"},{word:"panda",hint:"Eat bamboo"},{word:"Kangaroo",hint:"This anuimal is known for kickboxing"},{word:"Dog",hint:"Man's best friend"}];
//var hint = false;
//var boxVal ="";

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

window.onload = startGame();

$(".letter").click(function(){
    //console.log($(this).attr("id"));
    checkLetter($(this).attr("id"));
    disableButton($(this));
});
$(".replayBtn").on("click",function(){
    location.reload();
});
$(".hintBtn").on("click",function(){
    alert(selectedHint);
})
function startGame(){
    pickWord();
    initBoard();
    createLetters();
    updateBoard();
}

//Fill the board with underscores
function initBoard(){
    for (var letter in selectedWord){
        board.push("_");
    }
}
function pickWord(){
    var randomInt = Math.floor(Math.random()*words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}
function updateBoard(){
    $("#word").empty();
    for(var letter of board){
        document.getElementById("word").innerHTML += letter +" ";
    }
    $("#word").append("<br />");
    //$("#word").append("<span class='hint'>Hint: "+selectedHint+"</span>").hide();
   // $(this).text(selectedHint).attr("#word", "Hide");
     
}
function createLetters(){
    for(var letter of alphabet){
        $("#letters").append("<button class='letter' id ='"+letter+"'>"+letter+"</button>");
    }
}
function checkLetter(letter){
    var positons = new Array();
    
    for(var i = 0; i<selectedWord.length;i++){
        // console.log(selectedWord)
        if(letter == selectedWord[i]){
            positons.push(i);
        }
    }
    
    if(positons.length>0){
        updateWord(positons,letter);
        if(!board.includes('_')){
            endGame(true);
        }
    }else{
        remainingGuesses-=1;
        updateMan();
        
    }
    if(remainingGuesses<=0){
        endGame(false);
    }
}
function updateWord(positons,letter){
    for(var pos of positons){
        board[pos] = letter;
    }
    updateBoard();
}
function updateMan(){
    $("#hangImg").attr("src","img/stick_"+(6-remainingGuesses)+".png");
}
function endGame(win){
    $("#letters").hide();
    if(win){
        $('#won').show();
    }
    else{
        $('#lost').show();
    }
}
function disableButton(btn){
    btn.prop("disabled",true);
    btn.attr("class","btn btn-danger");
}