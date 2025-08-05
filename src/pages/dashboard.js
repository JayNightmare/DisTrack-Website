import React, { useEffect /* useState */ } from "react";
import Navbar from "../components/navbar";
import Particles from "../components/particles";

export default function Dashboard() {
    // const [data, setData] = useState(null);

    useEffect(() => {
        // Placeholder API call to demonstrate MongoDB connection
        // fetch("/api/dashboard")
        //     .then((res) => res.json())
        //     .then((json) => setData(json))
        //     .catch(() => {
        //         // ignore errors for placeholder
        //     });
    }, []);

    return (
        <div className="min-h-screen text-white p-8 space-y-6 bg-gradient-to-tl via-zinc-600/20 to-black from-black">
            <Navbar />
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-zinc-800 rounded p-4">
                    <h2 className="font-semibold mb-2">Coding Time</h2>
                    <p>{/* data?.codingTime ||  */ "Loading..."}</p>
                </div>
                <div className="bg-zinc-800 rounded p-4">
                    <h2 className="font-semibold mb-2">Commit Graph</h2>
                    <p>Coming Soon</p>
                </div>
                <div className="bg-zinc-800 rounded p-4">
                    <h2 className="font-semibold mb-2">Leaderboard Status</h2>
                    <p>{/* data?.leaderboard || */ "Loading..."}</p>
                </div>
            </div>
        </div>
    );
}
