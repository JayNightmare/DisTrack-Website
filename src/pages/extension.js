import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";
import { Link } from "react-router-dom";

export default function Extension() {
    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />

            <Particles className="absolute inset-0 -z-10" quantity={100} />

            <div className="flex items-center justify-center mb-8">
                <h1 className="dis-container py-3.5 px-0.5 z-10 text-white bg-white cursor-default text-edge-outline font-display sm:text-6xl md:text-5xl whitespace-nowrap bg-clip-text ">
                    <p className="dis-alt">Download</p>
                </h1>
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-6">
                <div>
                    <p className="text-lg text-zinc-400 mb-8">
                        Download the plugin on your VSCode IDE now! Search
                    </p>

                    <div className="text-lg text-zinc-400 mb-8">
                        <code>Dis.Track</code>
                    </div>

                    <p className="text-lg text-zinc-400 mb-8">
                        in the extensions directory and it's the first result.
                    </p>

                    <p className="text-lg text-zinc-400 mb-8">
                        To keep up with the progress, follow Jay on GitHub and
                        star the repo. To help fund the project, consider
                        sponsoring me on GitHub!
                    </p>
                </div>

                <div className="space-y-4 flex items-center flex-col">
                    <div className="flex gap-4">
                        <Link
                            href="https://discord.com/oauth2/authorize?client_id=1305258645906526328"
                            className="inline-block px-6 py-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md hover:scale-105
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-indigo-600"
                        >
                            Invite Bot
                        </Link>

                        <Link
                            href="https://marketplace.visualstudio.com/items?itemName=JayNightmare.dis-track"
                            className="inline-block px-6 py-3 text-base
                            font-semibold text-white bg-black
                            rounded-lg shadow-md hover:scale-105
                            transition duration-300 hover:bg-zinc-800
                            border border-zinc-600 hover:border-pink-600"
                        >
                            Download Extension
                        </Link>
                    </div>

                    <div className="flex gap-4 flex-col">
                        {/* Title for the section */}
                        <h1 className="text-lg text-white text-zinc-400 mt-10">
                            <span>Follow the project on Github</span>
                        </h1>
                        <div className="flex gap-4">
                            {/* Link to GitHub Profile */}

                            <Link
                                href="https://github.com/JayNightmare"
                                target="_blank"
                                className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 hover:scale-105 transition duration-300"
                            >
                                Follow on GitHub
                            </Link>

                            {/* Link to GitHub Sponsors */}

                            <Link
                                href="https://github.com/sponsors/JayNightmare"
                                target="_blank"
                                className="inline-block px-6 py-3 text-base font-semibold text-white bg-pink-600 rounded-lg shadow-md hover:bg-pink-500 hover:scale-105 transition duration-300"
                            >
                                Sponsor on GitHub
                            </Link>

                            {/* Link to Repository */}

                            <Link
                                href="https://github.com/JayNightmare/DisTrack"
                                target="_blank"
                                className="inline-block px-6 py-3 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-500 hover:scale-105 transition duration-300"
                            >
                                Star the Repo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
