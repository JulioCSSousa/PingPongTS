const canvasEl:any = document.querySelector("canvas"),
canvasContext = canvasEl.getContext("2d");

const lineWidth:number = 15;
const gapX: number = 10

function setup():void{
    canvasEl.width = canvasContext.width = window.innerWidth;
    canvasEl.height = canvasContext.width = window.innerHeight;
}


class Field {
    public w: number
    public h: number
    constructor(w: number, h: number)
    {
        this.w = w;
        this.h = h;

    }
    draw(): void{
        canvasContext.fillStyle = "#286047";
        canvasContext.fillRect(0, 0, this.w , this.h);
        
    }
}

const field: Field = new Field(window.innerWidth, window.innerHeight)
console.log(field.w)
class Line{
    private w:number;
    private h:number;

    constructor(w: number, h: number){
        this.w = w
        this.h = h
    }

    get_w():number{
        return this.w
    }
    get_h():number{
        return this.h
    }
    
    draw(): void{
    canvasContext.fillStyle = "#ffffff";
    canvasContext.fillRect(field.w / 2 - this.w / 2, 0, this.w , this.h);
    }
}
const line: Line = new Line(15, field.h)

class LeftPaddle{
    private x: number;
    private y: number;
    private w: number;
    private h: number;

    constructor(x:number, y:number, w:number, h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    get_x(): number{
        return this.x
    }
    get_y(): number{
        return this.y
    }

    get_w(): number{
        return this.w
    }
    get_h(): number{
        return this.h
    }

    move(){
        this.y = mouse.get_y();
    }

    draw(): void {
        canvasContext.fillStyle = "#ffffff";
        canvasContext.fillRect(this.x, this.y, this.w, this.h);

    }
}
const leftPaddle: LeftPaddle = new LeftPaddle(10, 100, line.get_w(), 200)

class RightPaddle{
    public x: number;
    public y: number;
    public w: number;
    public h: number;

    constructor(x:number, y:number, w:number, h:number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    move():void{
        this.y = ball.get_y();
    }
    get_x(): number{
        return this.x
    }
    get_y(): number{
        return this.y
    }

    get_w(): number{
        return this.w
    }
    get_h(): number{
        return this.h
    }
    draw(): void {
        canvasContext.fillStyle = "#ffffff";
        canvasContext.fillRect(this.x, this.y, this.w, this.h);
    }

}
let rightPaddle: RightPaddle = new RightPaddle(field.w - line.get_w() - gapX, 100, line.get_w(), 200)

class Ball{
    private x: number;
    private y: number;
    private r: number;
    private directionY: number
    private directionX: number
    private speedy:number 

    constructor(x: number, y: number, r: number, directionX: number, directionY: number, ){
        this.x = x;
        this.y = y;
        this.r = r
        this.directionX = directionX;
        this.directionY = directionY;
        this.speedy = 5
        
        
    }

    get_x():number{
        return this.x
    }
    get_y():number{
        return this.y
    }

    move(){
        this.x += this.speedy * this.directionX;
        this.y += this.speedy * this.directionY;
    }

    speedy_up(){
        this.speedy += 2;
    }

    draw()
    {
    canvasContext.beginPath();
    canvasContext.arc(this.x, this.y, this.r, 0, 2.0 * Math.PI, false);
    canvasContext.fill();
    }
    reset_ball(){
        this.x = field.w / 2;
        this.y = field.h / 2;
        this.speedy_up();
    }

    checkPositionY():void {
        if(this.y > field.h - this.r && this.directionY > 0 || this.y < 0 + this.r){
            this.directionY *= -1;
        }

    }

    check_point_human(){
        if (this.x > field.w - this.r - rightPaddle.get_w()){
            if (this.y + this.r >= rightPaddle.get_y()
                && this.y - this.r < rightPaddle.y + rightPaddle.h )
            {
                this.directionX *= -1;
                
            } else{
                score.set_score_human();
                ball.reset_ball()
            }
        };
    }
    check_point_computer(){
        if (this.x < 0 + this.r + leftPaddle.get_w()){
            if (this.y >= leftPaddle.get_y() && this.y < leftPaddle.get_y() + leftPaddle.get_h()){
                this.directionX *= -1;
            }
            else{
                score.set_score_computer();
                ball.reset_ball()
            }
        };
    }
    
}


const ball: Ball = new Ball(700, 200, 20, 1, 1)

class Score{
    private human: number;
    private computer: number;

    constructor(human: number, computer: number){
        this.human = human;
        this.computer = computer;
    }

    set_score_human():void {
        this.human += 1;
    }
    set_score_computer():void {
        this.computer += 1;
    }
    draw(){
        canvasContext.font = 'bold 72px Arial';
        canvasContext.textAlign = 'center';
        canvasContext.textBaseAlign = 'top';
        canvasContext.fillstyle = '#01341D';
        canvasContext.fillText(this.human, window.innerWidth / 4, 50);
        canvasContext.fillText(this.computer, window.innerWidth / 4 + window.innerWidth / 2, 50);

    }
}
const score: Score = new Score(0, 0);

class Mouse{
    private x: number;
    private y: number;

    constructor(){
        this.x = 0;
        this.y = 0;
    }
    get_y():number{
        return this.y;
    }
    move(x:number, y:number){
        this.x = x;
        this.y = y; 
    }

}

const mouse = new Mouse();

canvasEl.addEventListener('mousemove', function(e:any){
    mouse.move(e.pageX, e.pageY);
})

function draw():void {
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
    ball.check_point_computer()
    ball.check_point_human()
}



setup();
draw();

window.setInterval(draw, 1000/60)