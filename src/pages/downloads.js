import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Downloads() {
    const [open, setOpen] = useState(null); // 'vscode' | 'cursor' | null

    const vscodeUrl =
        "https://marketplace.visualstudio.com/items?itemName=JayNightmare.distrack";
    const cursorUrl = "https://open-vsx.org/extension/JayNightmare/distrack";

    const cards = [
        {
            id: "vscode",
            name: "VSCode",
            url: vscodeUrl,
            instructions: (
                // <ol className="list-decimal pl-5 space-y-2 text-zinc-300 text-sm">
                //     <li>Open VS Code.</li>
                //     <li>Go to Extensions (Ctrl+Shift+X).</li>
                //     <li>
                //         Search for{" "}
                //         <span className="font-semibold">Dis.Track</span>.
                //     </li>
                //     <li>Click Install on the Dis.Track extension.</li>
                //     <li>
                //         Or install via Marketplace:{" "}
                //         <a
                //             href={vscodeUrl}
                //             target="_blank"
                //             rel="noreferrer"
                //             className="text-indigo-400 hover:text-indigo-300 underline"
                //         >
                //             marketplace listing
                //         </a>
                //         .
                //     </li>
                // </ol>
                <>
                    {/* Notice: VSCode Extension is currently unavailable */}
                    <p className="w-full p-4 rounded-lg bg-yellow-900/30 border border-yellow-700/50 text-yellow-200 text-center text-sm">
                        Note: The VS Code extension is currently{" "}
                        <strong>unavailable</strong> due to Marketplace issues.
                        Please check back later or use the Cursor extension.
                    </p>

                    {/* {instructions} */}
                </>
            ),
            Icon: function VSCodeIcon({ className = "w-10 h-10" }) {
                return (
                    <svg
                        width="64"
                        height="64"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <mask
                            id="mask0"
                            mask-type="alpha"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z"
                                fill="white"
                            />
                        </mask>
                        <g mask="url(#mask0)">
                            <path
                                d="M96.4614 10.7962L75.8569 0.875542C73.4719 -0.272773 70.6217 0.211611 68.75 2.08333L1.29858 63.5832C-0.515693 65.2373 -0.513607 68.0937 1.30308 69.7452L6.81272 74.754C8.29793 76.1042 10.5347 76.2036 12.1338 74.9905L93.3609 13.3699C96.086 11.3026 100 13.2462 100 16.6667V16.4275C100 14.0265 98.6246 11.8378 96.4614 10.7962Z"
                                fill="#0065A9"
                            />
                            <g filter="url(#filter0_d)">
                                <path
                                    d="M96.4614 89.2038L75.8569 99.1245C73.4719 100.273 70.6217 99.7884 68.75 97.9167L1.29858 36.4169C-0.515693 34.7627 -0.513607 31.9063 1.30308 30.2548L6.81272 25.246C8.29793 23.8958 10.5347 23.7964 12.1338 25.0095L93.3609 86.6301C96.086 88.6974 100 86.7538 100 83.3334V83.5726C100 85.9735 98.6246 88.1622 96.4614 89.2038Z"
                                    fill="#007ACC"
                                />
                            </g>
                            <g filter="url(#filter1_d)">
                                <path
                                    d="M75.8578 99.1263C73.4721 100.274 70.6219 99.7885 68.75 97.9166C71.0564 100.223 75 98.5895 75 95.3278V4.67213C75 1.41039 71.0564 -0.223106 68.75 2.08329C70.6219 0.211402 73.4721 -0.273666 75.8578 0.873633L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.5871C100 85.9891 98.6234 88.1786 96.4586 89.2196L75.8578 99.1263Z"
                                    fill="#1F9CF0"
                                />
                            </g>
                            <g
                                /* style="mix-blend-mode:overlay" */ opacity="0.25"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.5871V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7807L75.8117 0.873695C73.7255 -0.13019 71.2838 0.115699 69.4527 1.44688C69.1912 1.63705 68.942 1.84937 68.7082 2.08335L29.2943 38.0414L12.1264 25.0096C10.5283 23.7964 8.29285 23.8959 6.80855 25.246L1.30225 30.2548C-0.513334 31.9064 -0.515415 34.7627 1.29775 36.4169L16.1863 50L1.29775 63.5832C-0.515415 65.2374 -0.513334 68.0937 1.30225 69.7452L6.80855 74.754C8.29285 76.1042 10.5283 76.2036 12.1264 74.9905L29.2943 61.9586L68.7082 97.9167C69.3317 98.5405 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50L74.9544 72.7012V27.2989Z"
                                    fill="url(#paint0_linear)"
                                />
                            </g>
                        </g>
                        <defs>
                            <filter
                                id="filter0_d"
                                x="-8.39411"
                                y="15.8291"
                                width="116.727"
                                height="92.2456"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="4.16667" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="overlay"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow"
                                    result="shape"
                                />
                            </filter>
                            <filter
                                id="filter1_d"
                                x="60.4167"
                                y="-8.07558"
                                width="47.9167"
                                height="116.151"
                                filterUnits="userSpaceOnUse"
                                color-interpolation-filters="sRGB"
                            >
                                <feFlood
                                    flood-opacity="0"
                                    result="BackgroundImageFix"
                                />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                />
                                <feOffset />
                                <feGaussianBlur stdDeviation="4.16667" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="overlay"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow"
                                    result="shape"
                                />
                            </filter>
                            <linearGradient
                                id="paint0_linear"
                                x1="49.9392"
                                y1="0.257812"
                                x2="49.9392"
                                y2="99.7423"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="white" />
                                <stop
                                    offset="1"
                                    stop-color="white"
                                    stop-opacity="0"
                                />
                            </linearGradient>
                        </defs>
                    </svg>
                );
            },
        },
        {
            id: "cursor",
            name: "Cursor",
            url: cursorUrl,
            instructions: (
                <ol className="list-decimal pl-5 space-y-2 text-zinc-300 text-sm">
                    <li>Open Cursor.</li>
                    <li>Open the Extensions view.</li>
                    <li>
                        Search for{" "}
                        <span className="font-semibold">Dis.Track</span>.
                    </li>
                    <li>Click Install on the Dis.Track extension.</li>
                    <li>
                        Or install via Open VSX:{" "}
                        <a
                            href={cursorUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 underline"
                        >
                            open-vsx listing
                        </a>
                        .
                    </li>
                </ol>
            ),
            Icon: function CursorIcon({ className = "w-10 h-10" }) {
                return (
                    <svg
                        height="64px"
                        width="64px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Cursor</title>
                        <path
                            d="M11.925 24l10.425-6-10.425-6L1.5 18l10.425 6z"
                            fill="url(#lobe-icons-cursorundefined-fill-0)"
                        ></path>
                        <path
                            d="M22.35 18V6L11.925 0v12l10.425 6z"
                            fill="url(#lobe-icons-cursorundefined-fill-1)"
                        ></path>
                        <path
                            d="M11.925 0L1.5 6v12l10.425-6V0z"
                            fill="url(#lobe-icons-cursorundefined-fill-2)"
                        ></path>
                        <path
                            d="M22.35 6L11.925 24V12L22.35 6z"
                            fill="#555"
                        ></path>
                        <path
                            d="M22.35 6l-10.425 6L1.5 6h20.85z"
                            fill="#000"
                        ></path>
                        <defs>
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="lobe-icons-cursorundefined-fill-0"
                                x1="11.925"
                                x2="11.925"
                                y1="12"
                                y2="24"
                            >
                                <stop
                                    offset=".16"
                                    stop-color="#000"
                                    stop-opacity=".39"
                                ></stop>
                                <stop
                                    offset=".658"
                                    stop-color="#000"
                                    stop-opacity=".8"
                                ></stop>
                            </linearGradient>
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="lobe-icons-cursorundefined-fill-1"
                                x1="22.35"
                                x2="11.925"
                                y1="6.037"
                                y2="12.15"
                            >
                                <stop
                                    offset=".182"
                                    stop-color="#000"
                                    stop-opacity=".31"
                                ></stop>
                                <stop
                                    offset=".715"
                                    stop-color="#000"
                                    stop-opacity="0"
                                ></stop>
                            </linearGradient>
                            <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="lobe-icons-cursorundefined-fill-2"
                                x1="11.925"
                                x2="1.5"
                                y1="0"
                                y2="18"
                            >
                                <stop
                                    stop-color="#000"
                                    stop-opacity=".6"
                                ></stop>
                                <stop
                                    offset=".667"
                                    stop-color="#000"
                                    stop-opacity=".22"
                                ></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                );
            },
        },
    ];

    const randomMessages = [
        "Closing...",
        "See you later!",
        "Come back soon!",
        "Take care!",
        "Goodbye!",
        "Until next time!",
        "Have a great day!",
        "Stay awesome!",
        "Keep coding!",
        "Noooooo",
        "Farewell, friend!",
        "Femboy...",
        "Your Mother...",
        "Don't forget to star the repo!",
        "192.168.127...",
        "Why did you close me?",
        "I'll be here when you return",
        "Adios, amigo!",
        "Catch you on the flip side!",
        "May the source be with you!",
        "I know where you live...",
        "I see you...",
        "You can't escape me!",
        "I'll be watching...",
        "Linux user detected...",
        "Windows user detected...",
        "Mac user detected...",
        "Have you tried turning it off and on again?",
        "Did you read the documentation?",
        "Remember to back up your data!",
    ];
    const messages = Math.floor(Math.random() * randomMessages.length);

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />

            <div className="flex items-center justify-center mb-8 flex-col">
                <h1 className="dis-container py-3.5 px-0.5 z-10 text-white bg-white cursor-default text-edge-outline font-display sm:text-6xl md:text-5xl whitespace-nowrap bg-clip-text">
                    <p className="">Download</p>
                </h1>
                <p className="text-lg text-zinc-400">
                    <span className="text-zinc-400">
                        Get started by installing the extension for your IDE
                        below.
                    </span>
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-10">
                {/* Invite Discord Bot */}
                <div className="flex items-center justify-center">
                    <a
                        href="https://discord.com/oauth2/authorize?client_id=1305258645906526328"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-800 hover:scale-[95%] transition duration-300"
                    >
                        <span>Invite Discord Bot</span>
                    </a>
                </div>

                {/* Supported IDEs */}
                <section>
                    <h2 className="text-center text-xl font-semibold text-zinc-200 mb-4">
                        Supported IDEs
                    </h2>
                    <p className="text-center text-zinc-400 mb-6">
                        Click an IDE to view installation instructions
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                        {cards.map(({ id, name, url, Icon, instructions }) => (
                            <div
                                key={id}
                                role="button"
                                tabIndex={0}
                                onClick={() => setOpen(open === id ? null : id)}
                                onKeyDown={(e) =>
                                    (e.key === "Enter" || e.key === " ") &&
                                    setOpen(open === id ? null : id)
                                }
                                className={`self-start h-fit cursor-pointer rounded-lg border border-zinc-700/50 bg-zinc-900/40 p-4 transition hover:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                                    open === id
                                        ? "ring-1 ring-indigo-500/40"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Icon className="w-10 h-10" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-lg font-semibold text-zinc-100">
                                            {name}
                                        </div>
                                        {/* <div className="text-sm text-zinc-400 truncate">
                                            <a
                                                href={url}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="underline hover:text-zinc-300"
                                            >
                                                Click to view
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-[300ms] ${
                                        open === id
                                            ? "mt-4 max-h-[400px]"
                                            : "max-h-0"
                                    }`}
                                >
                                    {open === id ? (
                                        <div className="pt-2 border-t border-zinc-800/60">
                                            {instructions}
                                        </div>
                                    ) : (
                                        <div className="pt-2 border-t border-zinc-800/60">
                                            <p className="text-zinc-400 text-sm">
                                                {randomMessages[messages]}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Project links */}
                <section className="space-y-4">
                    <h2 className="text-center text-zinc-300">
                        <span className="text-zinc-300">Source Code</span> |{" "}
                        <span className="text-zinc-300">Support</span> |{" "}
                        <span className="text-zinc-300">Roadmap</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="https://github.com/JayNightmare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600  shadow-md hover:bg-indigo-800 hover:scale-[95%] transition duration-300 rounded-xl"
                        >
                            {/* Icon of GitHub */}
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 97 96"
                                className="w-6 h-6 inline-block -mt-0.5"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                                    fill="#fff"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/sponsors/JayNightmare"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 text-base font-semibold text-white bg-pink-600  shadow-md hover:bg-pink-800 hover:scale-[95%] transition duration-300 rounded-xl"
                        >
                            {/* Icon of Heart */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6 inline-block -mt-0.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/users/JayNightmare/projects/4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 text-base font-semibold text-white bg-purple-600  shadow-md hover:bg-purple-800 hover:scale-[95%] transition duration-300 rounded-xl"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 640 640"
                                fill="currentColor"
                                className="w-6 h-6 inline-block -mt-0.5"
                            >
                                <path d="M480 576L192 576C139 576 96 533 96 480L96 160C96 107 139 64 192 64L496 64C522.5 64 544 85.5 544 112L544 400C544 420.9 530.6 438.7 512 445.3L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L480 576zM192 448C174.3 448 160 462.3 160 480C160 497.7 174.3 512 192 512L448 512L448 448L192 448zM224 216C224 229.3 234.7 240 248 240L424 240C437.3 240 448 229.3 448 216C448 202.7 437.3 192 424 192L248 192C234.7 192 224 202.7 224 216zM248 288C234.7 288 224 298.7 224 312C224 325.3 234.7 336 248 336L424 336C437.3 336 448 325.3 448 312C448 298.7 437.3 288 424 288L248 288z" />
                            </svg>
                        </a>
                    </div>
                </section>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
