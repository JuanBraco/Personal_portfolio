"use client";
import Link from "next/link";
import { Navigation } from "../components/nav";
import Button from "../components/button";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";
import { handleDraw, updateGamePhysics } from './utils'
import React, { useRef, useEffect, useState } from 'react';


export default function Game() {
	const gameContainerRef = useRef<HTMLDivElement>(null);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
	const [gameStarted, setGameStarted] = useState(false);
	const { width, height } = canvasSize;

	window.addEventListener("keydown", (e: KeyboardEvent) => {
		const target = e.target as HTMLElement;
		if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || (e.code === "Space" && target.nodeName !== "INPUT" && target.nodeName !== "TEXTAREA")) {
		  e.preventDefault();
		}
	  });
	
	const updateCanvasSize = () => {
	  if (gameContainerRef.current) {
		setCanvasSize({
		  width: gameContainerRef.current.offsetWidth,
		  height: gameContainerRef.current.offsetHeight,
		});
	  }
	};

	useEffect(() => {
			updateCanvasSize();
	}, []);

	function sketch(p5: P5CanvasInstance) {
		let varGame = {
			yBall: height / 2,
			xBall: width / 2 - width * 0.0125 / 2,
			xSpeed: width * 0.005,
			ySpeed: height * 0.01,
			scoreL: 0,
			scoreR: 0,
			yPadL: height / 2 -	height * 0.2 / 2,
			yPadR: height / 2 - height * 0.2 / 2,
		}

		p5.setup = () => p5.createCanvas(width, height);
	
		// p5.windowResized = () => {
		// 	updateCanvasSize();
		// 	p5.resizeCanvas(width, height);
		// };

		p5.draw = () => {
			handleDraw(p5, canvasSize, varGame);
			updateGamePhysics(varGame, canvasSize);
			// Move the ball
			varGame.xBall = varGame.xBall + varGame.xSpeed;
	  		varGame.yBall = varGame.yBall + varGame.ySpeed;

			// Simple AI for left paddle
			const speed = height * 0.01; // Speed of the paddle movement
			if (varGame.yBall > varGame.yPadL + speed) {
				varGame.yPadL = Math.min(varGame.yPadL + speed, height - height * 0.2);
			} else if (varGame.yBall < varGame.yPadL - speed) {
				varGame.yPadL = Math.max(varGame.yPadL - speed, 0);
			}

			// Reset the game if a player wins
			if (varGame.scoreL === 3 || varGame.scoreR === 3) {
				varGame.scoreL = 0;
				varGame.scoreR = 0;
				varGame.yPadL = height / 2 - height * 0.2 / 2;
				varGame.yPadR = height / 2 - height * 0.2 / 2;
				setGameStarted(false);
			}
		};

		p5.keyPressed = () => {
			const e = { code: p5.key };
			if (e.code === 'ArrowUp') {
				if (varGame.yPadR >= 0) {varGame.yPadR = varGame.yPadR - height / 15 }
			} else if (e.code === 'ArrowDown') {
				if (varGame.yPadR <= height - height * 0.2) { varGame.yPadR = varGame.yPadR + height / 15 }
			}
		};
	}

	const startGame = () => {
        setGameStarted(true);
    };
	

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="relative h-screen overflow-hidden px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div ref={gameContainerRef} className="absolute inset-0 mt-20 m-10">
					{!gameStarted ? (
						<div className="absolute top-20 left-0 right-0 z-10 text-center p-4">
						<div className="container mx-auto max-w-lg text-center p-4">
							<h4 className="text-4xl sm:text-2xl md:text-5xl text-transparent bg-white bg-clip-text text-edge-outline font-display mb-4">Welcome to the Game</h4>
							<p className="text-base mb-4 text-zinc-400">Ready to start playing.</p>
						</div>
						<Button onClick={startGame}>
							Join Game
						</Button>
					</div>): (
						<ReactP5Wrapper sketch={sketch} />
					)}
				</div>
			</div>
		</div>
	);
}
