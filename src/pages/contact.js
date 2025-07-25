import React from "react";

export default function Contact() {
    const contacts = [
        {
            title: "GitHub",
            description: "View our code on GitHub",
            href: "#", // placeholder
        },
        {
            title: "Email",
            description: "Send us an email",
            href: "mailto:info@example.com",
        },
        {
            title: "Discord",
            description: "Join our Discord server",
            href: "#",
        },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-10 text-white">
            <div className="grid gap-6 sm:grid-cols-3 px-4">
                {contacts.map((c) => (
                    <a
                        key={c.title}
                        href={c.href}
                        className="bg-zinc-800 rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                        <p className="text-sm text-zinc-300">{c.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
