import React, { useEffect, useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { handleDraw, updateGamePhysics } from './utils'

interface DrawSketchProps {
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawSketch: React.FC<DrawSketchProps> = ({ setGameStarted }) =>  {
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
        const updateCanvasSize = () => {
            const divElement = document.querySelector('.game-sketch');
            if (divElement) {
                setCanvasSize({
                    width: divElement.clientWidth,
                    height: divElement.clientHeight,
                });
            }
        };
        updateCanvasSize();
    }, []);

  // Function to draw the wave
  function sketch(p5: P5CanvasInstance) {
    let varGame = {
        yBall: canvasSize.height / 2,
        xBall: canvasSize.width / 2 - canvasSize.width * 0.0125 / 2,
        xSpeed: canvasSize.width * 0.005,
        ySpeed: canvasSize.height * 0.01,
        scoreL: 0,
        scoreR: 0,
        yPadL: canvasSize.height / 2 -	canvasSize.height * 0.2 / 2,
        yPadR: canvasSize.height / 2 - canvasSize.height * 0.2 / 2,
    }

    p5.setup = () => p5.createCanvas(canvasSize.width, canvasSize.height);

    p5.windowResized = () => {
        const updateCanvasSize = () => {
            const divElement = document.querySelector('.game-sketch');
            if (divElement) {
                setCanvasSize({
                    width: divElement.clientWidth,
                    height: divElement.clientHeight,
                });
            }
          };
        updateCanvasSize();
        p5.resizeCanvas(canvasSize.width, canvasSize.height);
    };

    p5.draw = () => {
        handleDraw(p5, canvasSize, varGame);
        updateGamePhysics(varGame, canvasSize);
        // Move the ball
        varGame.xBall = varGame.xBall + varGame.xSpeed;
          varGame.yBall = varGame.yBall + varGame.ySpeed;

        // Simple AI for left paddle
        const speed = canvasSize.height * 0.01; // Speed of the paddle movement
        if (varGame.yBall > varGame.yPadL + speed) {
            varGame.yPadL = Math.min(varGame.yPadL + speed, canvasSize.height - canvasSize.height * 0.2);
        } else if (varGame.yBall < varGame.yPadL - speed) {
            varGame.yPadL = Math.max(varGame.yPadL - speed, 0);
        }

        // Reset the game if a player wins
        if (varGame.scoreL === 3 || varGame.scoreR === 3) {
            varGame.scoreL = 0;
            varGame.scoreR = 0;
            varGame.yPadL = canvasSize.height / 2 - canvasSize.height * 0.2 / 2;
            varGame.yPadR = canvasSize.height / 2 - canvasSize.height * 0.2 / 2;
            setGameStarted(false);
        }
    };

    p5.keyPressed = () => {
        const e = { code: p5.key };
        if (e.code === 'ArrowUp') {
            if (varGame.yPadR >= 0) {varGame.yPadR = varGame.yPadR - canvasSize.height / 15 }
        } else if (e.code === 'ArrowDown') {
            if (varGame.yPadR <= canvasSize.height - canvasSize.height * 0.2) { varGame.yPadR = varGame.yPadR + canvasSize.height / 15 }
        }
    };
}

  return <ReactP5Wrapper sketch={sketch}/>;
}

export default DrawSketch;