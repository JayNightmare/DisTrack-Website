import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";

import "./style.css";

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black text-center px-6">
            <Navigation />
            <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            />

            <h1 className="dis-container text-3xl md:text-5xl font-bold text-white mb-4">
                <span className="dis">Dis.Track</span>
                <span className="mr-2"></span>{" "}
                {/* Adding margin here to create space */}
                Extension
            </h1>

            <p className="text-lg text-zinc-400 mb-8">
                Download the plugin on your VSCode IDE now! Search `Discord VSCode Tracker` in the extensions directory and it's the first result.
            </p>
            <p className="text-lg text-zinc-400 mb-8">
                To keep up with the progress, follow Jay on GitHub and star the
                repo. To help fund the project, consider sponsoring me on
                GitHub!
            </p>
            <br />
            <p className="text-lg text-zinc-400 mb-8">
                Wish to keep notified? Add the discord bot to your server and it
                will send you a message when the extension is public!
            </p>
            <Link
                href="https://discord.com/oauth2/authorize?client_id=1305258645906526328"
                className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 hover:scale-105 transition-transform duration-300"
            >
                Invite Bot
            </Link>
            <Link
                href="https://marketplace.visualstudio.com/items?itemName=JayNightmare.dis-track"
                className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 hover:scale-105 transition-transform duration-300"
            >
                Download Extension
            </Link>
            <br />
            <br />
            <br />

            <div className="flex gap-4">
                {/* Link to GitHub Profile */}
                <Link
                    href="https://github.com/JayNightmare"
                    target="_blank"
                    className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 transition-transform duration-300"
                >
                    Follow on GitHub
                </Link>

                {/* Link to GitHub Sponsors */}
                <Link
                    href="https://github.com/sponsors/JayNightmare"
                    target="_blank"
                    className="inline-block px-6 py-3 text-base font-semibold text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-500 transition-transform duration-300"
                >
                    Sponsor on GitHub
                </Link>

                {/* Link to Repository */}
                <Link
                    href="https://github.com/JayNightmare/DisTrack"
                    target="_blank"
                    className="inline-block px-6 py-3 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-500 transition-transform duration-300"
                >
                    Star the Repo
                </Link>
            </div>
        </div>
    );
}
