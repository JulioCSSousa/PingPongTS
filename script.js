"use strict";
const canvasEl = document.querySelector("canvas"), canvasContext = canvasEl.getContext("2d");
const lineWidth = 15;
const gapX = 10;
function setup() {
    canvasEl.width = canvasContext.width = window.innerWidth;
    canvasEl.height = canvasContext.width = window.innerHeight;
}
class Field {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }
    draw() {
        canvasContext.fillStyle = "#286047";
        canvasContext.fillRect(0, 0, this.w, this.h);
    }
}
const field = new Field(window.innerWidth, window.innerHeight);
console.log(field.w);
class Line {
    constructor(w, h) {
        this.w = w;
        this.h = h;
    }
    get_w() {
        return this.w;
    }
    get_h() {
        return this.h;
    }
    draw() {
        canvasContext.fillStyle = "#ffffff";
        canvasContext.fillRect(field.w / 2 - this.w / 2, 0, this.w, this.h);
    }
}
const line = new Line(15, field.h);
class LeftPaddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    get_x() {
        return this.x;
    }
    get_y() {
        return this.y;
    }
    get_w() {
        return this.w;
    }
    get_h() {
        return this.h;
    }
    move() {
        this.y = mouse.get_y();
    }
    draw() {
        canvasContext.fillStyle = "#ffffff";
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
}
const leftPaddle = new LeftPaddle(10, 100, line.get_w(), 200);
class RightPaddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    move() {
        this.y = ball.get_y();
    }
    get_x() {
        return this.x;
    }
    get_y() {
        return this.y;
    }
    get_w() {
        return this.w;
    }
    get_h() {
        return this.h;
    }
    draw() {
        canvasContext.fillStyle = "#ffffff";
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }
}
let rightPaddle = new RightPaddle(field.w - line.get_w() - gapX, 100, line.get_w(), 200);
class Ball {
    constructor(x, y, r, directionX, directionY) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.directionX = directionX;
        this.directionY = directionY;
        this.speedy = 5;
    }
    get_x() {
        return this.x;
    }
    get_y() {
        return this.y;
    }
    move() {
        this.x += this.speedy * this.directionX;
        this.y += this.speedy * this.directionY;
    }
    speedy_up() {
        this.speedy += 2;
    }
    draw() {
        canvasContext.beginPath();
        canvasContext.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI, false);
        canvasContext.fill();
    }
    reset_ball() {
        this.x = field.w / 2;
        this.y = field.h / 2;
        this.speedy_up();
    }
    checkPositionY() {
        if (this.y > field.h - this.r && this.directionY > 0 || this.y < 0 + this.r) {
            this.directionY *= -1;
        }
    }
    check_point_human() {
        if (this.x > field.w - this.r - rightPaddle.get_w()) {
            if (this.y + this.r >= rightPaddle.get_y()
                && this.y - this.r < rightPaddle.y + rightPaddle.h) {
                this.directionX *= -1;
            }
            else {
                score.set_score_human();
                ball.reset_ball();
            }
        }
        ;
    }
    check_point_computer() {
        if (this.x < 0 + this.r + leftPaddle.get_w()) {
            if (this.y >= leftPaddle.get_y() && this.y < leftPaddle.get_y() + leftPaddle.get_h()) {
                this.directionX *= -1;
            }
            else {
                score.set_score_computer();
                ball.reset_ball();
            }
        }
        ;
    }
}
const ball = new Ball(700, 200, 20, 1, 1);
class Score {
    constructor(human, computer) {
        this.human = human;
        this.computer = computer;
    }
    set_score_human() {
        this.human += 1;
    }
    set_score_computer() {
        this.computer += 1;
    }
    draw() {
        canvasContext.font = 'bold 72px Arial';
        canvasContext.textAlign = 'center';
        canvasContext.textBaseAlign = 'top';
        canvasContext.fillstyle = '#01341D';
        canvasContext.fillText(this.human, window.innerWidth / 4, 50);
        canvasContext.fillText(this.computer, window.innerWidth / 4 + window.innerWidth / 2, 50);
    }
}
const score = new Score(0, 0);
class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
    }
    get_y() {
        return this.y;
    }
    move(x, y) {
        this.x = x;
        this.y = y;
    }
}
const mouse = new Mouse();
canvasEl.addEventListener('mousemove', function (e) {
    mouse.move(e.pageX, e.pageY);
});
function draw() {
    field.draw();
    line.draw();
    leftPaddle.draw();
    leftPaddle.move();
    rightPaddle.draw();
    rightPaddle.move();
    score.draw();
    ball.draw();
    ball.move();
    ball.checkPositionY();
    ball.check_point_computer();
    ball.check_point_human();
}
setup();
draw();
window.setInterval(draw, 1000 / 60);
