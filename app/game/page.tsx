"use client";
import { Navigation } from "../components/nav";
import Button from "../components/button";
import React, { useEffect, useState } from 'react';
import dynamic from "next/dynamic";

const ClientSideSketch = dynamic(() => import("./DrawSketch"), {
  ssr: false
});

export default function Game() {
	const [gameStarted, setGameStarted] = useState(false);
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });


	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
		  const target = e.target as HTMLElement;
		  if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || (e.code === "Space" && target.nodeName !== "INPUT" && target.nodeName !== "TEXTAREA")) {
			e.preventDefault();
		  }
		};
	  
		window.addEventListener("keydown", handleKeyDown);
	  
		return () => {
		  window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);
	


	const startGame = () => {
        setGameStarted(true);
    };
	

	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="relative h-screen overflow-hidden px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
			<div className="game-sketch absolute inset-0 mt-20 m-10">
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
						<ClientSideSketch setGameStarted={setGameStarted}/>
					)}
				</div>
			</div>
		</div>
	);
}
