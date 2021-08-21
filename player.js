class Player {
    constructor(x, y, imgsrc, playernum, butrigth, butleft, butatt, butspec, butkick, mana, hp, name, w, h) {
        this.x = x
        this.y = y
        this.imgsrc = imgsrc
        this.playernum = playernum
        this.butright = butrigth
        this.butleft = butleft
        this.butatt = butatt
        this.butkick = butkick
        this.butspec = butspec
        this.mana = mana
        this.hp = hp
        this.h = h
        this.w = w
        this.name = name
        this.time = 0
        this.delay = 5
        this.canAtt = true
        this.ball = null
        this.state = "standRight"
        this.canShoot = false
    }
    moveRight() {
        if (this.x <= canvas.width) {
            this.x += 5
            this.state = "moveRight"
        }
    }
    moveLeft() {
        if (this.x >= 0) {
            this.x -= 5
            this.state = "moveLeft"
        }
    }
    idle(state) {
        this.time++
        switch (state) {
            case "Right":
                if (this.time > this.delay) {
                    if (this.imgsrc == this.playernum + "standRight_1.png") {
                        this.imgsrc = this.playernum + "standRight_2.png"
                    }
                    else {
                        this.imgsrc = this.playernum + "standRight_1.png"
                    }
                    this.time = 0
                    break;
                }
            case "Left":
                if (this.time > this.delay) {
                    if (this.imgsrc == this.playernum + "standLeft_1.png") {
                        this.imgsrc = this.playernum + "standLeft_2.png"
                    }
                    else {
                        this.imgsrc = this.playernum + "standLeft_1.png"
                    }
                    this.time = 0
                    break;
                }
        }
        this.canAtt = true
    }
    render(canvas) {
        let img = new Image();
        img.src = this.imgsrc;
        let pen = canvas.getContext("2d")
        pen.drawImage(img, this.x, this.y, img.width, img.height)
    }
    stateMachine() {
        switch (this.state) {
            case "standRight":
                this.idle("Right")
                break;
            case "standLeft":
                this.idle("Left")
                break;
            case "moveRight":
                this.imgsrc = this.playernum + "moveRight.png"
                this.moveRight()
                break;
            case "moveLeft":
                this.imgsrc = this.playernum + "moveLeft.png"
                this.moveLeft()
                break;
            case "punchRight":
                this.imgsrc = this.playernum + "punchRight.png"
                break;
            case "punchLeft":
                this.imgsrc = this.playernum + "punchLeft.png"
                break;
            case "kickRight":
                this.imgsrc = this.playernum + "kickRight.png"
                break;
            case "kickLeft":
                this.imgsrc = this.playernum + "kickLeft.png"
                break;
            case "specialRight":
                if (this.mana >= 100 && this.canShoot == true) {
                    this.imgsrc = this.playernum + "specialRight.png"
                    this.ball = new Ball(game.paper, this.x + this.w + 10)
                    this.ball.dir = "right"
                    game.balls.push(this.ball)
                    this.mana -= 100
                    this.canAtt = false
                    this.canShoot = false
                }
                break;
            case "specialLeft":
                if (this.mana >= 100 && this.canShoot == true) {
                    this.imgsrc = this.playernum + "specialLeft.png"
                    this.ball = new Ball(game.paper, this.x - 60)
                    this.ball.dir = "left"
                    game.balls.push(this.ball)
                    this.mana -= 100
                    this.canAtt = false
                    this.canShoot = false
                }
                break;
        }
    }
    takeHit(damage) {
        this.hp -= damage
    }
}
class Ball {
    constructor(paper, x) {
        this.paper = paper
        this.pen = this.paper.getContext("2d")
        this.dir = "right"
        this.x = x
        this.w = 40
    }
    move() {
        if (this.dir == "right") {
            this.x += 5
        }
        else if (this.dir == "left") {
            this.x -= 5
        }
    }
    render() {
        this.pen.drawImage(ballImg, this.x, 80, 40, 40)
    }
}