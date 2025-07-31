import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Particles from "../components/particles";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Replace with actual faq data later
const faqData = [
    {
        question: "What is Dis.Track?",
        answer: "Dis.Track is a VSCode extension that tracks your coding time and allows you to share it with friends on Discord.",
    },
    {
        question: "How do I install Dis.Track?",
        answer: "You can install Dis.Track from the VSCode Marketplace by searching for 'Dis.Track'.",
    },
    {
        question: "Is Dis.Track free?",
        answer: "Yes, Dis.Track is completely free to use.",
    },
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-6">FAQ</h1>
                {/* FAQ List */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <button
                            // glass morphism effect
                            className="w-full text-left bg-zinc-800 bg-opacity-50 p-4 rounded-lg shadow-lg transition-transform duration-300 border-b border-zinc-700"
                            style={{ cursor: "pointer" }}
                            key={index}
                            onClick={() => toggle(index)}
                        >
                            <div className="w-full text-left">
                                <span className="pr-2">
                                    {activeIndex === index ? "▾" : "▸"}
                                </span>
                                {item.question}
                            </div>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        key="content"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-2 text-zinc-300"
                                    >
                                        <div className="text-sm">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    ))}
                </div>
            </div>
            <Footer className="mt-8" />
        </div>
    );
}
