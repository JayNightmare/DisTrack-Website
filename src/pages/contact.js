import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";

export default function Contact() {
    const contacts = [
        {
            title: "GitHub",
            description: "Join the GitHub discussions",
            href: "https://github.com/JayNightmare/DisTrack-Website/discussions",
        },
        {
            title: "Email",
            description: "Send an Email",
            href: "mailto:jn3.enquiries@gmail.com",
        },
        {
            title: "Discord",
            description: "Join the Discord Community server",
            href: "https://discord.gg/Zx45G4pZ3J",
        },
    ];

    const [form, setForm] = useState({
        name: "",
        discord: "",
        email: "",
        reason: "",
    });
    const [status, setStatus] = useState("");
    const webhookUrl =
        "https://discord.com/api/webhooks/1403567130934251603/" +
        "dDknPfsMv49uEwXEWXYqrfXYlwq6u3TIwguykT0mGg4genp9ojP1vyqqQ1wjYjnzR8Oc";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        if (!form.discord) {
            setStatus("Discord ID is required.");
            return;
        }

        const content =
            `**New Contact Submission**\n` +
            `**Name:** ${form.name || "N/A"}\n` +
            `**Discord ID:** ${form.discord}\n` +
            `**Email:** ${form.email || "N/A"}\n` +
            `**Reason:** ${form.reason}`;

        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });
            setStatus("Message sent! We'll get back to you soon.");
            setForm({ name: "", discord: "", email: "", reason: "" });
        } catch (err) {
            setStatus("Failed to send message. Please try again later.");
        }
    };

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
                        <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                        <p className="text-sm text-zinc-300">{c.description}</p>
                    </a>
                ))}
            </div>
            <div className="max-w-md mx-auto mt-8">
                <p className="text-zinc-300 mb-4">
                    Have a question or suggestion? Fill out the form below and
                    we'll get back to you.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full p-2 rounded bg-zinc-700"
                    />
                    <input
                        type="text"
                        name="discord"
                        value={form.discord}
                        onChange={handleChange}
                        placeholder="Discord ID *"
                        required
                        className="w-full p-2 rounded bg-zinc-700"
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email (optional)"
                        className="w-full p-2 rounded bg-zinc-700"
                    />
                    <textarea
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        placeholder="Reason for contacting"
                        required
                        className="w-full p-2 rounded bg-zinc-700 h-32"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 rounded p-2"
                    >
                        Send
                    </button>
                    {status && (
                        <p className="text-sm text-center text-zinc-300">{status}</p>
                    )}
                </form>
            </div>
            <Footer />
        </div>
    );
}
