import React from "react";

export default function SupportPin() {
    return (
        <a
            href="/support"
            className="fixed bottom-4 right-4 bg-pink-900/75 hover:bg-indigo-900/50 text-white p-4 rounded-full shadow-lg transition duration-300 z-50"
            title="Support the Developer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        </a>
    );
}
