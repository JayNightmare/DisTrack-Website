import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

import Footer from "../components/footer";
import LiveCounterRow from "../components/stats/LiveCounterRow";
import TrendMiniCards from "../components/stats/TrendMiniCards";
import WorldCodingHeatmap from "../components/stats/WorldCodingHeatmap";
import LanguageShareDonut from "../components/stats/LanguageShareDonut";
import HallOfFlame from "../components/stats/HallOfFlame";
import {
    getGlobalLiveCounters,
    getGlobalTrends,
    getGlobalHourlyHeatmap,
    getGlobalLanguageShare,
    getFastestGrowingUsers,
} from "../api/statsApi";
import {
    normalizeHourlyMatrix,
    computeLanguageShareWithDelta,
} from "../components/stats/normalizers";

const navigation = [
    { name: "Explore", href: "/showcase" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "FAQ", href: "/faq" },
    { name: "Download", href: "/downloads" },
    { name: "Contact", href: "/contact" },
];

export default function HomePage() {
    const [live, setLive] = useState(null);
    const [trends, setTrends] = useState(null);
    const [hourlyMatrix, setHourlyMatrix] = useState(null);
    const [langShare, setLangShare] = useState(null);
    const [hof, setHof] = useState([]);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const [l, t, hm, ls, fg] = await Promise.all([
                    getGlobalLiveCounters(),
                    getGlobalTrends(7),
                    getGlobalHourlyHeatmap(30),
                    getGlobalLanguageShare(30, true),
                    getFastestGrowingUsers("week", 10),
                ]);
                if (cancelled) return;
                setLive(l);
                setTrends(t);
                setHourlyMatrix(normalizeHourlyMatrix(hm));
                const share = computeLanguageShareWithDelta(
                    ls || { current: {}, previous: {} }
                );
                setLangShare(share);
                setHof(fg || []);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error("Homepage global stats load failed", e);
            }
        };
        load();
        const id = setInterval(load, 60 * 1000); // refresh every minute
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);
    return (
        <div className="flex flex-col items-center min-h-screen w-screen overflow-x-hidden bg-gradient-to-tl via-zinc-600/20 to-black from-black">
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

            <h1 className="dis-container py-3.5 px-0.5 z-10 text-4xl text-white duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
                <p className="dis">Dis</p>Track
            </h1>

            <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

            <div className="my-6 mx-5 text-center animate-fade-in">
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

            <div className="mb-10 fade-in-custom">
                <Link
                    to="/downloads" // replace with actual plugin URL
                    className="inline-block px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-500 hover:scale-105 transition-transform duration-300"
                >
                    Add to VSCode
                </Link>
            </div>

            {/* Announcement about the current state of the extension */}
            <div className="w-full max-w-3xl px-4 mb-10">
                <div className="w-full p-4 rounded-lg bg-yellow-900/30 border border-yellow-700/50 text-yellow-200 text-center text-sm">
                    <strong className="font-semibold">Announcement:</strong>{" "}
                    <p>
                        The endpoint for DisTrack is currently going through
                        maintenance and refactoring. Specifically on how the
                        server handles API Key generation and tokens.
                    </p>
                    <p>
                        As a solo developer on this project, I'm finding it hard
                        to find time with work and Masters. If you're a
                        developer and have knowledge in{" "}
                        <strong>
                            Node.JS Backend Developement, please reach out!
                        </strong>
                    </p>
                    <p>
                        If you have Dis<strong>.</strong>Track installed, please
                        uninstall and install <strong>DisTrack</strong> instead.
                    </p>
                    <p>
                        I started a Discord Server for this project, so if
                        you're a programmer and looking for like-minded people,
                        join the{" "}
                        <a
                            href="https://discord.gg/Zx45G4pZ3J"
                            target="_blank"
                            rel="noreferrer"
                            className="underline font-semibold hover:text-yellow-300"
                        >
                            Discord server
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Live counters row */}
            <div className="w-full px-4 flex justify-center">
                {live ? (
                    <LiveCounterRow
                        totalHours={Number(
                            live.totalHoursTracked || live.totalHours || 0
                        )}
                        usersOnline={Number(
                            live.usersOnline || live.onlineUsers || 0
                        )}
                        sessionsToday={Number(live.sessionsToday || 0)}
                        topLanguageToday={
                            live.topLanguageToday || live.topLanguage || "—"
                        }
                        avgSessionMinutes={Number(
                            live.avgSessionMinutes ||
                                live.avgSessionLengthMinutes ||
                                0
                        )}
                    />
                ) : (
                    <div className="w-full max-w-5xl h-16 rounded bg-zinc-900/40 border border-zinc-700/40 animate-pulse" />
                )}
            </div>

            {/* Trend mini-cards */}
            <div className="w-full px-4 mt-6 flex justify-center">
                {trends ? (
                    <TrendMiniCards
                        hoursTracked={(trends.hoursTracked || []).map((h) =>
                            Number(h)
                        )}
                        activeUsers={(trends.activeUsers || []).map((u) =>
                            Number(u)
                        )}
                        avgStreak={(trends.avgStreak || []).map((s) =>
                            Number(s)
                        )}
                    />
                ) : (
                    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="h-20 rounded bg-zinc-900/40 border border-zinc-700/40 animate-pulse" />
                        <div className="h-20 rounded bg-zinc-900/40 border border-zinc-700/40 animate-pulse" />
                        <div className="h-20 rounded bg-zinc-900/40 border border-zinc-700/40 animate-pulse" />
                    </div>
                )}
            </div>

            {/* Hero heatmap + language donut + hall of flame */}
            <div className="w-full px-4 mt-8 max-w-6xl grid grid-cols-1 gap-6">
                <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/40 p-4">
                    {hourlyMatrix ? (
                        <WorldCodingHeatmap matrix={hourlyMatrix} />
                    ) : (
                        <div className="h-64 rounded bg-zinc-900/40 border border-zinc-700/40 animate-pulse" />
                    )}
                </div>
                <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/40 p-4 flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2 ">
                        {langShare ? (
                            <LanguageShareDonut items={langShare.items} />
                        ) : (
                            <div className="h-64 rounded bg-zinc-900/40 border border-zinc-700/40 animate-pulse" />
                        )}
                    </div>
                    <div className="w-full md:w-1/2">
                        <HallOfFlame users={hof} />
                    </div>
                </div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
