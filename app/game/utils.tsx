import p5 from "p5";


export const handleDraw = (p5: p5, canvasSize: any, varGame: any) => {
    const padW = canvasSize.width * 0.0167
    const padH = canvasSize.height * 0.2
    const ballD = canvasSize.width * 0.0125
	// Background with dashed line
    p5.background(0);
	p5.stroke(255);
	p5.strokeWeight(4);
	for (let i = 0; i < canvasSize.height; i += 20) {
	  p5.line(canvasSize.width / 2, i, canvasSize.width / 2, i + 10);
	}

	// Scores
	p5.fill(255);
	p5.stroke(0); // Black stroke for better visibility
    p5.strokeWeight(2); // Stroke weight for the text
	p5.textAlign(p5.CENTER, p5.TOP); // Centered text at the top
	p5.textSize(canvasSize.width * 0.1);
	p5.text(varGame.scoreL, canvasSize.width * 0.25, 20); // Position adjusted
    p5.text(varGame.scoreR, canvasSize.width * 0.75, 20); // Position adjusted
  
	//Mobile items
	p5.noStroke();
	p5.fill(255);
	p5.rect(0, varGame.yPadL, padW, padH);
	p5.rect(canvasSize.width - padW, varGame.yPadR, padW, padH);
	p5.rect(varGame.xBall, varGame.yBall, ballD, ballD);
}

export const updateGamePhysics = (varGame: any, canvasSize: any) => {
    const ballD = canvasSize.width * 0.0125
    // Check for collision with left and right paddles
    checkPaddleCollision(varGame, "left", canvasSize);
    checkPaddleCollision(varGame, "right", canvasSize);

    // Check for wall collision
    if ((varGame.ySpeed < 0 && varGame.yBall < 0) || 
        (varGame.ySpeed > 0 && varGame.yBall > canvasSize.height - ballD / 2)) {
        varGame.ySpeed *= -1;
    }
    // Check if a point is scored
    if (varGame.xBall < 0 || varGame.xBall > canvasSize.width) {
        const hitRight = varGame.xBall > canvasSize.width;
        handlePointScored(hitRight, varGame, canvasSize);
    }
}

/********** PRIVATE FUNCTIONS **********/

function handlePointScored(hitRight: boolean, varG: any, canvasSize: any) {
    if (hitRight) { varG.scoreL += 1 } else { varG.scoreR += 1 }
    varG.xBall = canvasSize.width / 2 - canvasSize.width * 0.0125 / 2;
    varG.yBall = canvasSize.height / 2;
    varG.xSpeed = -varG.xSpeed;
    varG.ySpeed = (Math.random() > 0.5 ? 1 : -1) * Math.abs(varG.ySpeed); // Add a bit of randomness to the ySpeed
}

function checkPaddleCollision(varGame: any, paddleSide: "left" | "right", canvasSize: any) {
    const padW = canvasSize.width * 0.0167
    const padH = canvasSize.height * 0.2
    const ballD = canvasSize.width * 0.0125
    const yPaddle = paddleSide === "left" ? varGame.yPadL : varGame.yPadR;
    const xPaddle = paddleSide === "left" ? 0 : canvasSize.width - padW;

    const collisionXCond = paddleSide === "left" ? 
                           varGame.xBall <= xPaddle + padW : 
                           varGame.xBall + ballD >= xPaddle;

    if (collisionXCond && varGame.yBall >= yPaddle && varGame.yBall <= yPaddle + padH) {
        const yMidPaddle = yPaddle + padH / 2;
        varGame.ySpeed = varGame.yBall < yMidPaddle ? -Math.abs(varGame.ySpeed) : Math.abs(varGame.ySpeed);
        varGame.xSpeed = -varGame.xSpeed;
    }
}