import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import Particles from "../components/particles";
import Footer from "../components/footer";

const navigation = [
    { name: "Explore", href: "/showcase" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "FAQ", href: "/faq" },
    { name: "Download", href: "/downloads" },
    { name: "Contact", href: "/contact" },
];

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <nav className="my-16 animate-fade-in">
                <ul className="flex items-center justify-center gap-4 flex-wrap">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            to={item.href}
                            className="nav-link text-md font-semibold px-4 py-2 duration-300 text-zinc-300 hover:text-white hover:scale-110 hover:text-shadow"
                        >
                            {item.name}
                        </Link>
                    ))}
                </ul>
            </nav>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />

            <h1 className="dis-container py-3.5 px-0.5 z-10 text-4xl text-white duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
                <p className="dis">Dis.</p>Track
            </h1>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

            <div className="my-16 mx-5 text-center animate-fade-in">
                <h2 className="text-sm text-zinc-500 ">
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/JayNightmare/DisTrack"
                        className="underline duration-500 hover:text-zinc-300"
                    >
                        Dis.Track
                    </a>{" "}
                    will track your time on VSCode, and will allow you to share
                    that with your friends on Discord
                </h2>
            </div>

            <div className="my-4 fade-in-custom">
                <Link
                    to="/downloads" // replace with actual plugin URL
                    className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 hover:scale-105 transition-transform duration-300"
                >
                    Add to VSCode
                </Link>
            </div>
            <div className="text-center mt-8 text-indigo-400 fade-in-custom">
                <div className="text-sm">
                    <ul>
                        Coming soon:{" "}
                        <li>
                            <Link
                                to="/showcase"
                                className="underline text-indigo-400 hover:text-indigo-300"
                            >
                                Showcase
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/leaderboard"
                                className="underline text-indigo-400 hover:text-indigo-300"
                            >
                                Leaderboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/faq"
                                className="underline text-indigo-400 hover:text-indigo-300"
                            >
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <p className="text-indigo-400">User Profiles</p>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
