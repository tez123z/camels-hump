"use client";

export default function HurricaneArt() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden select-none">
      {/* Background gradient - Clemson orange to deep purple night sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, #F66733 0%, #522D80 50%, #1a0a2e 100%)",
        }}
      />

      {/* Hurricane swirl */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-72 h-72 rounded-full opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, #F66733 90deg, transparent 180deg, #F66733 270deg, transparent 360deg)",
            animation: "spin-slow 8s linear infinite",
          }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-52 h-52 rounded-full opacity-20"
          style={{
            background:
              "conic-gradient(from 45deg, transparent, #fff 90deg, transparent 180deg, #F66733 270deg, transparent 360deg)",
            animation: "spin-slow 5s linear infinite reverse",
          }}
        />
      </div>

      {/* Inner eye of the hurricane */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-28 h-28 rounded-full"
          style={{
            background: "radial-gradient(circle, #1a0a2e 30%, transparent 70%)",
          }}
        />
      </div>

      {/* Lightning bolts */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 400 400"
      >
        <path
          d="M180 40 L160 120 L190 115 L150 200"
          stroke="#F66733"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M280 60 L265 130 L290 125 L260 190"
          stroke="#FFD700"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 80 L110 150 L90 145 L115 210"
          stroke="#F66733"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>

      {/* Guitar silhouette in the eye */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" opacity="0.7">
          <ellipse cx="50" cy="65" rx="22" ry="25" stroke="#F66733" strokeWidth="2" />
          <ellipse cx="50" cy="65" rx="8" ry="9" fill="#F66733" opacity="0.3" />
          <line x1="50" y1="40" x2="50" y2="8" stroke="#F66733" strokeWidth="3" />
          <line x1="44" y1="8" x2="56" y2="8" stroke="#F66733" strokeWidth="2" />
          <line x1="44" y1="12" x2="56" y2="12" stroke="#F66733" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Stars/particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
          style={{
            top: `${10 + Math.sin(i * 1.3) * 40 + 40}%`,
            left: `${10 + Math.cos(i * 1.7) * 40 + 40}%`,
            animationDelay: `${i * 0.2}s`,
            opacity: 0.4 + (i % 3) * 0.2,
          }}
        />
      ))}

      {/* Text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
        <p
          className="text-5xl font-black tracking-tighter"
          style={{
            color: "#F66733",
            textShadow: "0 0 30px rgba(246,103,51,0.6), 0 2px 4px rgba(0,0,0,0.8)",
            fontFamily: "Georgia, serif",
          }}
        >
          HURRICANE
        </p>
        <p
          className="text-3xl font-bold tracking-widest -mt-1"
          style={{
            color: "#fff",
            textShadow: "0 0 20px rgba(82,45,128,0.8), 0 2px 4px rgba(0,0,0,0.8)",
            fontFamily: "Georgia, serif",
          }}
        >
          DUANE
        </p>
        <p
          className="text-xs tracking-[0.3em] mt-2 uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Clemson Tailgate Rock &amp; Roll
        </p>
      </div>

      {/* Tiger paw prints scattered */}
      <svg className="absolute top-4 right-6 opacity-20" width="32" height="32" viewBox="0 0 100 100">
        <circle cx="50" cy="65" r="22" fill="#F66733" />
        <circle cx="28" cy="38" r="10" fill="#F66733" />
        <circle cx="72" cy="38" r="10" fill="#F66733" />
        <circle cx="15" cy="55" r="8" fill="#F66733" />
        <circle cx="85" cy="55" r="8" fill="#F66733" />
      </svg>
      <svg className="absolute top-16 left-5 opacity-15 -rotate-12" width="24" height="24" viewBox="0 0 100 100">
        <circle cx="50" cy="65" r="22" fill="#F66733" />
        <circle cx="28" cy="38" r="10" fill="#F66733" />
        <circle cx="72" cy="38" r="10" fill="#F66733" />
        <circle cx="15" cy="55" r="8" fill="#F66733" />
        <circle cx="85" cy="55" r="8" fill="#F66733" />
      </svg>
    </div>
  );
}
