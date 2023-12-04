"use client";
import { motion, useSpring, useMotionTemplate } from "framer-motion";
import React, { MouseEventHandler } from "react";

const Button: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	let maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	let style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<button
		  onMouseMove={onMouseMove}
		  onClick={onClick} // Attach the onClick handler
		  className="relative overflow-hidden border border-zinc-600 rounded-xl text-white font-bold py-2 px-4 transition duration-700 group hover:bg-zinc-800/10 hover:border-zinc-400/50"
		>
		  <motion.div
			className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
			style={style}
		  />
		  <motion.div
			className="pointer-events-none absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
			style={style}
		  />
		  {children}
		</button>
	  );
};

export default Button;