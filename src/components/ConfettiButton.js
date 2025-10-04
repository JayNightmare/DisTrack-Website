import React from "react";
import confetti from "canvas-confetti";

const ConfettiButton = ({ children, className, ...props }) => {
    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        // Coffee emoji confetti
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { x, y },
            shapes: ["circle"],
            colors: ["#8B4513", "#D2691E", "#CD853F", "#F4E4BC"], // Coffee colors
            gravity: 0.6,
            drift: 0.1,
            startVelocity: 30,
            scalar: 0.8,
        });

        // Call original onClick if provided
        if (props.onClick) {
            props.onClick(e);
        }
    };

    const handleMouseEnter = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        // Small burst on hover
        confetti({
            particleCount: 15,
            spread: 50,
            origin: { x, y },
            shapes: ["circle"],
            colors: ["#8B4513", "#D2691E", "#CD853F"], // Coffee colors
            gravity: 0.8,
            startVelocity: 20,
            scalar: 0.6,
        });

        // Call original onMouseEnter if provided
        if (props.onMouseEnter) {
            props.onMouseEnter(e);
        }
    };

    return (
        <a
            {...props}
            className={className}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
        >
            {children}
        </a>
    );
};

export default ConfettiButton;
