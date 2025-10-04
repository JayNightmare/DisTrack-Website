import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ConfettiButton from "../components/ConfettiButton";
import "../styles/gfm.css";

export default function SupportPage() {
    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <div className="max-w-3xl mx-auto bg-zinc-900/50 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4 text-center">
                    Support the Developer
                </h1>
                <p className="mb-4">
                    If you find DisTrack useful and would like to support its
                    development, consider the following options:
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>
                        <strong>Donate:</strong> You can make a one-time or
                        recurring donation via{" "}
                        <ConfettiButton
                            href="https://buymeacoffee.com/jordanbellx"
                            className="text-pink-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Buy Me a Coffee ☕{" "}
                        </ConfettiButton>
                        .
                    </li>
                    <li>
                        <strong>Spread the Word:</strong> Share DisTrack with
                        your friends and colleagues who might find it useful.
                    </li>
                    <li>
                        <strong>Feedback:</strong> Your feedback helps improve
                        DisTrack. Feel free to{" "}
                        <a
                            href="/contact"
                            className="text-pink-500 hover:underline"
                        >
                            contact us
                        </a>{" "}
                        with suggestions or issues.
                    </li>
                </ul>
                <p className="mb-4">
                    Your support is greatly appreciated and helps keep DisTrack
                    running and improving!
                </p>
                <div className="text-center">
                    <ConfettiButton
                        href="https://buymeacoffee.com/jordanbellx"
                        className="inline-block bg-[#4b0082] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Buy Me a Coffee ☕
                    </ConfettiButton>
                </div>
            </div>

            <div className="max-w-3xl mx-auto bg-zinc-900/50 p-6 rounded-lg shadow-lg flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">
                    Help Fund My Masters in AI
                </h2>
                <p className="mb-4 text-center">
                    I'm currently pursuing my Master's degree in Artificial
                    Intelligence. If you'd like to support my education and
                    research, consider contributing to my GoFundMe campaign.
                </p>
                <div
                    className="gfm-embed"
                    data-url="https://www.gofundme.com/f/help-fund-my-masters-in-ai/widget/medium?sharesheet=gfm.css&attribution_id=sl:978a73a5-be2a-40e9-8fec-8ba4e043a2fd"
                ></div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
