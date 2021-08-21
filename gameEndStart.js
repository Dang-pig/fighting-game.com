setInterval(() => {
    document.getElementById("btn").style.left = parseInt((window.innerWidth - 300) / 2) + "px"
}, 1);
function showInstuction() {
    document.getElementById("ins").style.width = window.innerWidth + "px"
    document.getElementById("ins").style.height = window.innerHeight + "px"
    document.getElementById("ins").style.display = "block"
    document.getElementById("gameStart").style.display = "none"
}
function closeIns() {
    document.getElementById("ins").style.display = "none"
    document.getElementById("gameStart").style.display = "block"
}
let paper = document.getElementById("canvas")
let img1 = document.getElementById("img1")
let img2 = document.getElementById("img2")
let ballImg = document.getElementById("imgp")
let name1
let name2
let game = null
function getName() {
    name1 = document.getElementById("name1").value
    name2 = document.getElementById("name2").value
    newGame()
    document.getElementById("canvas").style.width = window.innerWidth + "px"
    document.getElementById("canvas").style.height = window.innerHeight - 20 + "px"
    document.getElementById("gameStart").style.display = "none"
    document.getElementById("gamePlay").style.display = "block"
    game.player2.state = "standLeft"
    setInterval(main, 60)
    setInterval(incrMana, 500)
}
function checkName(){
    name1 = document.getElementById("name1").value
    name2 = document.getElementById("name2").value
    if (name1 == "") {
        document.getElementById("name1").placeholder = "please enter a name"
    }
    else if (name2 == "") {
        document.getElementById("name2").placeholder = "please enter a name"
    }
    else{
        getName()
    }
}
function endGame(winner) {
    if(winner == 1){
        document.getElementById("res").innerHTML = game.player1.name + " Win!"
    }
    else if(winner == 2){
        document.getElementById("res").innerHTML = game.player2.name + " Win!"
    }
    document.getElementById("gamePlay").style.display = "none"
    document.getElementById("gameEnd").style.display = "block"
    document.getElementById("imgWin").src = winner + "win.png"
    document.getElementById("imgWin").style.left = parseInt((window.innerWidth - 200)/2) + "px"
}
function reload() {
    window.location.reload()
}