import React from "react";
import Navbar from "../components/navbar";
import Particles from "../components/particles";

export default function Showcase() {
    const sections = [
        {
            title: "Use Cases",
            content: "Track your coding time and share progress with friends.",
        },
        {
            title: "Highlights",
            content: "Detailed statistics and Discord integration for teams.",
        },
        {
            title: "Future Plans",
            content: "More analytics and cross-platform support coming soon.",
        },
    ];

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            {sections.map((s, i) => (
                <div
                    key={s.title}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${i * 200}ms` }}
                >
                    <h2 className="text-xl font-bold mb-2">{s.title}</h2>
                    <p className="text-zinc-300">{s.content}</p>
                </div>
            ))}
        </div>
    );
}
