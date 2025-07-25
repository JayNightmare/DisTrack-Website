import React from "react";

export default function Extension() {
    const links = [
        { label: "VSCode Extension", href: "#" },
        { label: "Discord Bot", href: "#" },
        { label: "GitHub Repository", href: "#" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white space-y-4 p-8">
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
