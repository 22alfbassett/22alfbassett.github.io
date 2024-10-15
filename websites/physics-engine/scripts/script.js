let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouseX, mouseY;
onmousemove = function(e){mouseX = e.clientX, mouseY = e.clientY};

let fps = 60, fpsInterval, startTime, now, then, elapsed;

let radius, color;

function init() {
    fpsInterval = 1000/fps; //Get frequency in kHz
    then = Date.now();
    startTime = then; //We will use the miliseconds from the rtc to determine intervals

    loop = requestAnimationFrame(step);
}

let balls = new Array();


function createBall() {
    let scalar = 2; //To slow it down and make sure the balls don't just launch
    let xvi = (mouseOriginX - mouseX)/scalar, yvi = (mouseOriginY - mouseY)/scalar;
    let added = new Ball(mouseX, mouseY, xvi, yvi, radius, color);
    balls.push(added);
    lineIsBeingCreated = false;
}

function drawBalls(fps) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].drawBall();
        balls[i].updateBall(fps);
        for (let j = i+1; j < balls.length; j++) //Only one ball will update both
            balls[i].checkBallWithBallCollision(balls[j]);
    }
}

function step() {
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        drawBalls(fps);//Cycle CPU
    }

    if(lineIsBeingCreated) {
        drawWindUpLine(mouseOriginX, mouseOriginY);
    }

    loop = requestAnimationFrame(step);
}

let lineIsBeingCreated = false;
let mouseOriginX, mouseOriginY;

function createLine() {
    lineIsBeingCreated = true;
    mouseOriginX = mouseX;
    mouseOriginY = mouseY;
    radius = Math.ceil((Math.random() * 60) + 10);
    color = Math.floor(Math.random()*16777215).toString(16);
}

function drawWindUpLine(startX, startY) {
    ctx.beginPath();
    let distance = 20;
    ctx.moveTo(startX + distance, startY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(startX - distance, startY);
    ctx.stroke();

    //Draw ball
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, 2*Math.PI);
    ctx.fillStyle = "#" + color;
    ctx.fill();
    ctx.stroke();
}

canvas.addEventListener('mousedown', createLine);
canvas.addEventListener('mouseup', createBall);

init();