"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────
// ANIMATED TAGLINE
// Cycles through phrases with a spring slide animation.
// The highlight word is rendered in brand green;
// the rest of the phrase uses the parent's color (granite).
// To change phrases: edit the PHRASES array below.
// ─────────────────────────────────────────────
const PHRASES = [
  { highlight: "REWIND.",    }, //rest: " THE CLOCK."     },
  { highlight: "REJUVENATE.",}, //rest: " YOUR SPIRIT."   },
  { highlight: "RECHARGE.", } , ////rest: " YOUR ENERGY."   },
];

const INTERVAL_MS = 2500;

export function AnimatedTagline() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % PHRASES.length);
    }, INTERVAL_MS);
    return () => clearTimeout(id);
  }, [current]);

  return (
    // Fixed-height container so the layout never shifts when phrases change.
    // Height is set to ~2.3em to comfortably fit one line at any font size
    // (longest phrase wraps at narrow viewports, still contained).
    <span
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "relative", display: "flex", overflow: "hidden", height: "1.25em", width: "100%" }}
    >
      {PHRASES.map((phrase, index) => (
        <motion.span
          key={phrase.highlight}
          style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}
          initial={{ opacity: 0, y: 60 }}
          animate={
            current === index
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: current > index ? -60 : 60 }
          }
          transition={{ type: "spring", stiffness: 55, damping: 14 }}
        >
          {/* Highlight word — brand green, same shade as "Elevate" */}
          <span style={{ color: "var(--green)" }}>{phrase.highlight}</span>
          {/* Rest of phrase — inherits parent granite color */}
         
        </motion.span>
      ))}
    </span>
  );
}
