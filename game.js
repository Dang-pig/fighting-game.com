class Game {
    constructor(paper) {
        this.paper = paper
        this.pen = this.paper.getContext("2d")
        this.player1 = new Player(40, 70, img1, 1, "d", "a", "f", "h", "g", 200, 1000, name1, img1.width, img1.height)
        this.player2 = new Player(200, 70, img2, 2, "ArrowRight", "ArrowLeft", ";", "k", "l", 200, 1000, name2, img2.width, img1.height);
        this.punchDamage = 5
        this.kickDamage = 20
        this.specialDamage = 50
        this.balls = []
    }
    clearScreen() {
        this.pen.clearRect(0, 0, paper.width, paper.height)
    }
    isCrash2(player1, player2) {
        let left1 = player1.x
        let left2 = player2.x
        let right1 = player1.x + player1.w
        let right2 = player2.x + player2.w
        if (left1 > right2 || right1 < left2) {
            return false
        }
        else {
            return true
        }
    }
    checkCrash() {
        if (this.checkAttack(this.player1) && this.player1.canAtt) {
            if (this.isCrash2(this.player1, this.player2)) {
                this.player1.canAtt = false
                switch (this.player1.state) {
                    case "punchRight":
                    case "punchLeft":
                        this.player2.takeHit(this.punchDamage)
                        break;
                    case "kickRight":
                    case "kickLeft":
                        this.player2.takeHit(this.kickDamage)
                        break;
                    case "specialRight":
                    case "specialLeft":
                        this.player2.takeHit(this.specialDamage)
                        break;
                }
            }
        }
        if (this.checkAttack(this.player2) && this.player2.canAtt) {
            if (this.isCrash2(this.player2, this.player1)) {
                this.player2.canAtt = false
                switch (this.player2.state) {
                    case "punchRight":
                    case "punchLeft":
                        this.player1.takeHit(this.punchDamage)
                        break;
                    case "kickRight":
                    case "kickLeft":
                        this.player1.takeHit(this.kickDamage)
                        break;
                }
            }
        }
        for (let i = 0; i < this.balls.length; i++) {
            if (this.isCrash2(this.balls[i], this.player1)) {
                this.balls.splice(i, 1)
                this.player1.takeHit(this.specialDamage)
                i--
            }
            if (this.isCrash2(this.balls[i], this.player2)) {
                this.balls.splice(i, 1)
                this.player2.takeHit(this.specialDamage)
                i--
            }
        }
    }
    checkAttack(player) {
        return player.state == "punchRight" || player.state == "kickRight" || player.state == "punchLeft" || player.state == "kickLeft" || player.state == "specialRight" || player.state == " specialLeft"
    }
    moveBall() {
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].move()
            this.balls[i].render()
        }
    }
}
function newGame() {
    game = new Game(paper);
}
function main() {
    game.clearScreen()
    game.player1.stateMachine()
    game.player2.stateMachine()
    game.player1.render(paper)
    game.player2.render(paper)
    game.moveBall()
    game.checkCrash()
    showHPMN()
}
function control(evt) {
    controlPlayer(game.player1, evt.key)
    controlPlayer(game.player2, evt.key)
}
function controlPlayer(player, key) {
    switch (key) {
        case player.butright:
            player.state = "moveRight"
            break;
        case player.butleft:
            player.state = "moveLeft"
            break;
        case player.butatt:
            if (player.state == "moveRight" || player.state == "standRight" || player.state == "kickRight" || player.state == "specialRight")
                player.state = "punchRight"
            else if (player.state == "moveLeft" || player.state == "standLeft" || player.state == "kickLeft" || player.state == "specialLeft")
                player.state = "punchLeft"
            break;
        case player.butkick:
            if (player.state == "moveRight" || player.state == "standRight" || player.state == "punchRight" || player.state == "specialRight")
                player.state = "kickRight"
            else if (player.state == "moveLeft" || player.state == "standLeft" || player.state == "punchLeft" || player.state == "specialLeft")
                player.state = "kickLeft"
            break;
        case player.butspec:
            if (player.state == "moveRight" || player.state == "standRight" || player.state == "punchRight" || player.state == "kickRight")
                player.state = "specialRight"
            else if (player.state == "moveLeft" || player.state == "standLeft" || player.state == "punchLeft" || player.state == "kickLeft")
                player.state = "specialLeft"
            break;
    }
}
function controlStand(player, key) {
    if (key == player.butright || key == player.butleft || key == player.butatt || key == player.butkick || key == player.butspec) {
        if (player.state == "moveRight" || player.state == "punchRight" || player.state == "kickRight" || player.state == "specialRight") {
            player.state = "standRight"
            player.canAtt = true
            player.canShoot = true
        }
        else if (player.state == "moveLeft" || player.state == "punchLeft" || player.state == "kickLeft" || player.state == "specialLeft") {
            player.state = "standLeft"
            player.canAtt = true
            player.canShoot = true
        }
    }
}
function handleUp(evt) {
    controlStand(game.player1, evt.key)
    controlStand(game.player2, evt.key)
}
function showHPMN() {
    document.getElementById("hp1").innerHTML = game.player1.name + ": HP1: " + game.player1.hp + " Mana: " + game.player1.mana
    document.getElementById("hp2").innerHTML = game.player2.name + ": HP2: " + game.player2.hp + " Mana: " + game.player2.mana
    checkHP()
}
function checkHP() {
    if (game.player1.hp <= 0) {
        document.getElementById("hp1").innerHTML = game.player2.name + ": HP1: 0"
        endGame(2)
        setInterval(() => {
            game.player1.canAtt = false
        }, 1);
    }
    else if (game.player2.hp <= 0) {
        document.getElementById("hp2").innerHTML = game.player1.name + ": HP2: 0"
        endGame(1)
        document.getElementById("res").innerHTML = game.player1.name + " Win!"
        setInterval(() => {
            game.player1.canAtt = false
        }, 1);
    }
}
function incrMana() {
    if (game.player1.mana < 200) {
        game.player1.mana += 10
    }
    if (game.player2.mana < 200) {
        game.player2.mana += 10
    }
}
window.addEventListener("keydown", control)
window.addEventListener("keyup", handleUp)