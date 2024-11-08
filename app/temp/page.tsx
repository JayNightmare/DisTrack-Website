import Link from "next/link";
import React from "react";

export default function ComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black text-center px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Thank you for expressing your interest!
            </h1>
            <p className="text-lg text-zinc-400 mb-8">
                Sadly, the plugin hasn’t finished development yet! To keep up
                with the progress, follow Jay on GitHub and star the repo. To help
                fund the project, consider sponsoring me on GitHub!
            </p>

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
                    className="inline-block px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 transition-transform duration-300"
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