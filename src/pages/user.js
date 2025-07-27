import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";

const users = {
    1: {
        name: "Alice",
        codingTime: "120 hrs",
        habits: "Night owl coder",
        socials: {
            GitHub: "https://github.com/alice",
            Twitter: "https://twitter.com/alice",
        },
    },
    2: {
        name: "Bob",
        codingTime: "90 hrs",
        habits: "Morning person",
        socials: {
            GitHub: "https://github.com/bob",
        },
    },
};

export default function User() {
    const { id } = useParams();
    const user = users[id];

    if (!user) {
        return <div className="p-4">User not found.</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-8 space-y-6">
            <Navbar />
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p> Coding Time: {user.codingTime} </p>
            <p> Habits: {user.habits} </p>
            <div>
                <h2 className="font-semibold">Social Links</h2>
                <ul className="list-disc list-inside">
                    {Object.entries(user.socials).map(([label, url]) => (
                        <li key={label}>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
