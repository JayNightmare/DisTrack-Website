import Link from "next/link";
import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

import "./style.css";

const redis = Redis.fromEnv();

export const revalidate = 60;

export default async function ShowcasePage() {
  // Fetching user stats and bot achievements from Redis or any other source
  const totalCodingTime = await redis.get<number>("totalCodingTime") ?? 0;
  const activeUsers = await redis.get<number>("activeUsers") ?? 0;
  const topUsers = await redis.lrange<string>("topUsers", 0, 9) ?? [];
  const languageStats = await redis.hgetall<Record<string, number>>("languageStats") ?? {};

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Dis.Track Showcase
          </h2>
          <p className="mt-4 text-zinc-400">
            Explore the stats and achievements of our VSCode community.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <section className="user-activity">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            User Activity Dashboard
          </h2>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            <Card>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-bold text-zinc-100">Your Coding Time</h3>
                <p className="mt-2 text-zinc-400">{totalCodingTime} hours</p>
              </div>
            </Card>
            <Card>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-bold text-zinc-100">Active Sessions</h3>
                <p className="mt-2 text-zinc-400">{activeUsers}</p>
              </div>
            </Card>
            <Card>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-bold text-zinc-100">Most Used Languages</h3>
                <p className="mt-2 text-zinc-400">{activeUsers}</p>
              </div>
            </Card>
          </div>
        </section>

        <section className="language-stats">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Language Usage Statistics
          </h2>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            {Object.entries(languageStats).map(([language, time]) => (
              <Card key={language}>
                <div className="p-4 md:p-8">
                  <h3 className="text-xl font-bold text-zinc-100">{language}</h3>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="user-profiles">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Top Users
          </h2>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            {topUsers.map((user, index) => (
              <Card key={index}>
                <div className="p-4 md:p-8">
                  <h3 className="text-xl font-bold text-zinc-100">User {index + 1}</h3>
                  <p className="mt-2 text-zinc-400">{user}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="community-insights">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
            Community Insights
          </h2>
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            <Card>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-bold text-zinc-100">Total Coding Time</h3>
                <p className="mt-2 text-zinc-400">{totalCodingTime} hours</p>
              </div>
            </Card>
            <Card>
              <div className="p-4 md:p-8">
                <h3 className="text-xl font-bold text-zinc-100">Active Users</h3>
                <p className="mt-2 text-zinc-400">{activeUsers}</p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
