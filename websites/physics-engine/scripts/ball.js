class Ball{

    constructor(x, y, vx, vy, radius, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
    }

    updateBall(fps) {
        let overwrap = 0;
        let width = document.querySelector("canvas").width - overwrap;
        let height = document.querySelector("canvas").height - overwrap;
        let multiplier = 15;
        fps /= multiplier;
        let rayX = this.vx/fps;
        if (this.x > width - this.radius) this.x = width - this.radius;
        else if (this.x < this.radius) this.x = this.radius;
        if (this.y > height - this.radius) this.y = height - this.radius;
        else if (this.y < this.radius) this.y = this.radius;
        if (this.x+rayX >= width-this.radius || this.x+rayX <= this.radius)
            this.vx *= -0.9; //Loses some velocity from friction
        else
            this.x += rayX;

        let rayY = this.vy /fps;
        if (this.y + rayY >= height-this.radius || this.y + rayY <= this.radius) {
            this.vy *= -0.9; //Loses some velocity from friction
        }
        else
            this.y += rayY;

        this.vy += (1/fps) * 4.9;

        //Static friction-like
        if (Math.abs(this.vx) < 0.01)  this.vx = 0;
        if (Math.abs(this.vy) < 0.01) this.vy = 0;
        if (Math.ceil(this.y) == height - this.radius) this.vx *= 0.99; //Friction when not in air
    }

    drawBall() {
        let canvas = document.querySelector("canvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = "#" + this.color;
        ctx.fill();
        ctx.lineWidth = 0;
        ctx.stroke();
    }

    checkBallWithBallCollision(ball2) {
        //check collision for each pixel going down starting at the top using raycasting
        let xDiff = this.x - ball2.x;
        let yDiff = this.y - ball2.y;
        if (Math.sqrt(xDiff*xDiff+yDiff*yDiff) < this.radius + ball2.radius) { //Collides
            //We will say that the density is constant, thus it is a function of radius.
            //For simplicity sake, use radius * radius * pi to find mass
            //also because the collision check happens after the movement we just have to do the one ball
            let mA = this.radius * this.radius * Math.PI;
            let mB = ball2.radius * ball2.radius * Math.PI;
            let magVelA = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            let magVelB = Math.sqrt(ball2.vx * ball2.vx + ball2.vy * ball2.vy);
            let absVelA = (mA - mB) / (mA + mB) * magVelA + 2 * mB / (mA + mB) * magVelB;
            let absVelB = (mB - mA) / (mB + mA) * magVelB + 2 * mA / (mB + mA) * magVelA;
            let theta = Math.atan(yDiff / xDiff);
            //0.9 is for friction
            this.vx = 0.9 * absVelA * Math.cos(theta);
            this.vy = 0.9 * absVelA * Math.sin(theta);
            ball2.vx = 0.9 * -1 * absVelB * Math.cos(theta);
            ball2.vy = 0.9 * -1 * absVelB * Math.sin(theta);
            //check if it is still colliding after one step
            xDiff = Math.abs((this.x + this.vx) - (ball2.x + ball2.vx));
            yDiff = Math.abs((this.y + this.vy) - (ball2.y + ball2.vy));
            if (Math.sqrt(xDiff*xDiff+yDiff*yDiff) < this.radius + ball2.radius) { //If they are together, flip the velocity so they eject out of each other. Not a very good solution, but a solution nonetheless
                //Also this happens when more than two balls hit each other at once
                this.vx *= -1;
                this.vy *= -1;
                ball2.vx *= -1;
                ball2.vy *= -1;
            }
        }
    }

}