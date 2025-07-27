import React from "react";
import Navbar from "../components/navbar";

export default function Extension() {
    const links = [
        { label: "VSCode Extension", href: "#" },
        { label: "Discord Bot", href: "#" },
        { label: "GitHub Repository", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-8 space-y-6">
            <Navbar />
            {links.map((l) => (
                <a
                    key={l.label}
                    href={l.href}
                    className="text-indigo-400 underline hover:text-indigo-300"
                >
                    {l.label}
                </a>
            ))}
        </div>
    );
}
