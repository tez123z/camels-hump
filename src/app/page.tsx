"use client";

import { useState } from "react";
import MusicPlayer from "./MusicPlayer";
import HurricanePlayer from "./HurricanePlayer";

type Tab = "camels-hump" | "hurricane-duane";

export default function Home() {
  const [tab, setTab] = useState<Tab>("camels-hump");

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div
          className="inline-flex rounded-full p-1 gap-1"
          style={{ background: "var(--card-bg)" }}
        >
          <button
            onClick={() => setTab("camels-hump")}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={
              tab === "camels-hump"
                ? {
                    background: "var(--accent-purple)",
                    color: "var(--foreground)",
                  }
                : { color: "var(--muted)" }
            }
          >
            The Camel&apos;s Hump
          </button>
          <button
            onClick={() => setTab("hurricane-duane")}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all"
            style={
              tab === "hurricane-duane"
                ? {
                    background: "#F66733",
                    color: "#fff",
                  }
                : { color: "var(--muted)" }
            }
          >
            Hurricane Duane
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {tab === "camels-hump" ? <MusicPlayer /> : <HurricanePlayer />}

      <footer className="text-center mt-12 pb-8">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          In loving memory of Duane Evans
        </p>
      </footer>
    </div>
  );
}
