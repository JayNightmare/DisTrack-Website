import React from "react";
import Navbar from "../components/navbar";
import Particles from "../components/particles";

export default function Contact() {
    const contacts = [
        {
            title: "GitHub",
            description: "View our code on GitHub",
            href: "https://www.github.com/JayNightmare",
        },
        {
            title: "Email",
            description: "Send us an email",
            href: "mailto:jn3.enquiries@gmail.com",
        },
        {
            title: "Discord",
            description: "Join our Discord server",
            href: "#",
        },
    ];

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="grid gap-6 sm:grid-cols-3 px-4">
                {contacts.map((c) => (
                    <a
                        key={c.title}
                        href={c.href}
                        className="bg-zinc-800 rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            {c.title}
                        </h3>
                        <p className="text-sm text-zinc-300">{c.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
