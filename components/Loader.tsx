"use client";

import { useEffect, useState } from "react";

export default function FirdausLoader() {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200;
    const interval = 18;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const raw = current / steps;
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        setPhase("reveal");
        setTimeout(() => setPhase("done"), 900);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed bg-yellow-50 inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-[850ms] ease-in-out ${
        phase === "reveal" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      // style={{
      //   background:
      //     "linear-gradient(135deg, #faf7ff 0%, #f3eeff 45%, #fffbee 100%)",
      // }}
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(196,168,232,0.22) 0%, transparent 70%)",
            top: "5%",
            left: "8%",
            animation: "blob1 7s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 380,
            height: 380,
            background:
              "radial-gradient(circle, rgba(253,224,110,0.18) 0%, transparent 70%)",
            bottom: "10%",
            right: "10%",
            animation: "blob2 9s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 260,
            height: 260,
            background:
              "radial-gradient(circle, rgba(216,180,254,0.2) 0%, transparent 70%)",
            top: "48%",
            left: "56%",
            animation: "blob1 11s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* Resin orb */}
      <div className="relative mb-10">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Decorative rings */}
          <circle
            cx="60"
            cy="60"
            r="55"
            stroke="rgba(167,139,250,0.2)"
            strokeWidth="0.8"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke="rgba(196,168,232,0.15)"
            strokeWidth="0.5"
            strokeDasharray="3 6"
          />

          {/* Progress arc */}
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="url(#arcGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={`${progress * 3.267} 326.7`}
            strokeDashoffset="0"
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dasharray 0.05s linear" }}
          />

          {/* Orb body */}
          <circle cx="60" cy="60" r="35" fill="url(#resinGrad)" />

          {/* Resin swirl layers */}
          <ellipse
            cx="50"
            cy="48"
            rx="11"
            ry="6"
            fill="rgba(255,245,180,0.4)"
            style={{
              transform: "rotate(-25deg)",
              transformOrigin: "50px 48px",
            }}
          />
          <ellipse
            cx="67"
            cy="67"
            rx="8"
            ry="4.5"
            fill="rgba(216,180,254,0.3)"
            style={{ transform: "rotate(18deg)", transformOrigin: "67px 67px" }}
          />
          <ellipse cx="54" cy="72" rx="5" ry="3" fill="rgba(253,224,71,0.22)" />

          {/* Highlight */}
          <circle
            cx="47"
            cy="45"
            r="3.5"
            fill="rgba(255,255,255,0.75)"
            style={{ animation: "shimmer 2.5s ease-in-out infinite" }}
          />
          <circle
            cx="54"
            cy="41"
            r="1.5"
            fill="rgba(255,255,255,0.45)"
            style={{ animation: "shimmer 3s ease-in-out infinite 0.6s" }}
          />

          <defs>
            <linearGradient
              id="arcGrad"
              x1="0"
              y1="0"
              x2="120"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="55%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
            <radialGradient id="resinGrad" cx="37%" cy="33%" r="70%">
              <stop offset="0%" stopColor="#fefce8" />
              <stop offset="20%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#e9d5ff" />
              <stop offset="75%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7c3aed" />
            </radialGradient>
          </defs>
        </svg>

        {/* Counter inside orb */}
        <div
          className="absolute inset-0 flex items-center justify-center tabular-nums"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 14,
            color: "rgba(109,40,217,0.7)",
            letterSpacing: "0.05em",
          }}
        >
          {progress}
        </div>
      </div>

      {/* Brand name */}
      <div
        className="text-center"
        style={{ animation: "fadeUp 1s ease-out both" }}
      >
        <div
          className="uppercase font-bold leading-none mb-1.5"
          style={{
            // fontFamily: "'Cormorant Garamond', serif",
            fontSize: 42,
            letterSpacing: "0.35em",
            color: "#7c3aed",
            textShadow: "0 2px 28px rgba(196,168,232,0.5)",
          }}
        >
          Firdaus
        </div>
        <div
          className="uppercase font-medium"
          style={{
            // fontFamily: "'Cormorant Garamond', serif",
            fontSize: 21,
            letterSpacing: "0.55em",
            color: "rgba(167,139,250,0.65)",
          }}
        >
          Collective
        </div>
      </div>

      {/* Tagline */}
      <div
        className="mt-7 uppercase"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 11,
          letterSpacing: "0.28em",
          color: "rgba(180,150,90,0.5)",
          animation: "fadeUp 1.5s ease-out both",
        }}
      >
        Handcrafted with soul
      </div>

      {/* Floating diamonds */}
      <div
        className="absolute"
        style={{
          top: "17%",
          right: "20%",
          animation: "float 5s ease-in-out infinite",
        }}
      >
        <svg width="10" height="10" viewBox="0 0 10 10">
          <polygon points="5,0 10,5 5,10 0,5" fill="rgba(196,168,232,0.5)" />
        </svg>
      </div>
      <div
        className="absolute"
        style={{
          bottom: "24%",
          left: "19%",
          animation: "float 7s ease-in-out infinite 1s",
        }}
      >
        <svg width="7" height="7" viewBox="0 0 10 10">
          <polygon points="5,0 10,5 5,10 0,5" fill="rgba(253,211,77,0.5)" />
        </svg>
      </div>
      <div
        className="absolute"
        style={{
          top: "40%",
          left: "13%",
          animation: "float 6s ease-in-out infinite 0.4s",
        }}
      >
        <svg width="5" height="5" viewBox="0 0 10 10">
          <polygon points="5,0 10,5 5,10 0,5" fill="rgba(167,139,250,0.4)" />
        </svg>
      </div>
      <div
        className="absolute"
        style={{
          top: "25%",
          left: "28%",
          animation: "float 8s ease-in-out infinite 2s",
        }}
      >
        <svg width="6" height="6" viewBox="0 0 10 10">
          <polygon points="5,0 10,5 5,10 0,5" fill="rgba(253,224,71,0.35)" />
        </svg>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-100">
        <div
          className="h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #a78bfa, #ddd6fe, #fde047)",
            transition: "width 0.05s linear",
            boxShadow: "0 0 10px rgba(167,139,250,0.45)",
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap');

        @keyframes blob1 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(28px, 18px) scale(1.08); }
        }
        @keyframes blob2 {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(-22px, 14px) scale(1.06); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.75; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.5); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-9px) rotate(18deg); }
        }
      `}</style>
    </div>
  );
}
