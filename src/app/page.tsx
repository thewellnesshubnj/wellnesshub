"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { OriginButton } from "@/components/ui/origin-button";
import { AnimatedTagline } from "@/components/ui/animated-hero";
import { Instagram, Facebook, Mail, Menu, X, ArrowRight, Sparkles } from "lucide-react";

// ─────────────────────────────────────────────
// NAV LINKS — edit labels or anchor targets here
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Booking", href: "#booking" },
];

// ─────────────────────────────────────────────
// SERVICES SECTION
// To add a service: copy one object and add it to the array.
// To remove: delete the object.
// Images: use Unsplash URLs (w=400&h=400&fit=crop) or drop a file
//   in /public and use "/your-image.jpg" as the src.
// ─────────────────────────────────────────────
const SERVICES = [
  {
    name: "Hydrafacial",
    image: "/hydrafacial.jpeg",
    alt: "Woman receiving a facial treatment",
  },
  {
    name: "Treadvac Hypobaric Infrared Treadmill",
    image: "/treadvac_treadmill.jpeg",
    alt: "Infrared Treadmill Session",
  },
  {
    name: "AI-Led Pilates",
    image: "/pilates.jpeg",
    alt: "Pilates session",
  },
  {
    name: "Cryotherapy",
    image: "/cryotherapy2.jpeg",
    alt: "Cryotherapy session",
  },
  {
    name: "Yoga Studio",
    image: "/yoga.jpeg",
    alt: "Yoga Class",
  },
  {
    name: "HOCATT Therapy",
    image: "/hocatt.jpg",
    alt : "Hocatt Therapy Session",
  },
  {
    name : "Infrared Sauna",
    image: "/infrared.jpeg",
    alt: "Infrared Sauna Session",
  },
];

// ─────────────────────────────────────────────
// BOOKING / PRICING CARDS
// Update tier names, features, and prices here.
// ─────────────────────────────────────────────
const PRICING = [
  {
    tier: "Silver",
    name: "Restore",
    price: "TBD",
    blurb: "The details of our Silver membership are being thoughtfully curated. Exact inclusions, pricing, and perks will be announced at launch — stay tuned.",
    features: ["60-min therapeutic massage", "Basic wellness consultation", "Aromatherapy add-on"],
  },
  {
    tier: "Gold",
    name: "Revive",
    price: "TBD",
    blurb: "Our most popular tier is still being perfected. We're finalising the full lineup of treatments and AI-powered features — exciting things are coming soon.",
    featured: true,
    features: ["90-min full body treatment", "AI wellness assessment", "Facial + body scrub", "Post-session health report"],
  },
  {
    tier: "Diamond",
    name: "Transcend",
    price: "TBD",
    blurb: "The Diamond experience will be unlike anything else. Full details are being decided — check back at launch for our premium, all-inclusive offering.",
    features: ["Full-day luxury retreat", "Comprehensive AI health plan", "All services included", "Priority scheduling"],
  },
];

// ─────────────────────────────────────────────
// GOOGLE SHEETS — paste your Apps Script URL here
// ─────────────────────────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqkf3bEFh8cGvX3nnP4w8f-1Ps0C4jRJYDn8YNxMdhF6uhDBsV7hOuleXOv-fDN95tBQ/exec";

// ─────────────────────────────────────────────
// ORIGIN BUTTON STYLE TOKENS
// Two reusable style presets for the animated OriginButton:
//   btnGreen  → filled green bg, white text, white ripple fill
//   btnOutline → transparent bg, green border + text, green ripple fill
// Pass as: style={BTN.green} or style={BTN.outline}
// ─────────────────────────────────────────────
const BTN = {
  // Primary CTA — green bg / almond text, hover fills to persian-orange / almond
  primary: {
    "--ic-card": "var(--green)",
    "--ic-card-foreground": "var(--almond)",
    "--ic-foreground": "var(--almond)",
    "--ic-background": "var(--persian-orange)",
    "--ic-border": "var(--green)",
  } as React.CSSProperties,
  get green() { return this.primary; },
  get outline() { return this.primary; },
  get terracotta() { return this.primary; },
};

// ─────────────────────────────────────────────
// FADE-IN ANIMATION HOOK
// ─────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// LOGO COMPONENT
// To replace with your own image:
//   1. Drop your file into the /public folder (e.g. /public/logo.png)
//   2. Delete the <svg> block below
//   3. Uncomment the <Image> line and set the correct filename
// Recommended: PNG or SVG, minimum 200×200 px, transparent background
// ─────────────────────────────────────────────
function Logo({ size = 32, color = "var(--green)" }: { size?: number; color?: string }) {
  return (
    // ↓ SWAP THIS with: <Image src="/logo.png" alt="The Wellness Hub" width={size} height={size} />
    <Image src = "/logo.png" alt = "The Wellness Hub" width = {size} height = {size} unoptimized />
  );
}

// ─────────────────────────────────────────────
// HERO IMAGES
// To change the hero image: replace the Unsplash URL below with
//   another URL or a local path like "/hero.jpg" (file in /public).
// Recommended size: 900×1100 px, portrait orientation.
// ─────────────────────────────────────────────
const HERO_IMAGE =
  "/home_photo.jpeg";

// ─────────────────────────────────────────────
// ABOUT SECTION IMAGE
// Replace URL or use a local path "/about.jpg" (file in /public).
// Recommended size: 700×900 px, portrait orientation.
// ─────────────────────────────────────────────
const ABOUT_IMAGE =
  "/about_photo.jpeg";

// ─────────────────────────────────────────────
// FOOTER SOCIAL LINKS
// Update hrefs here. Use "mailto:..." for email.
// ─────────────────────────────────────────────
const SOCIAL_LINKS = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com/thewellnesshub_nj" },
  { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/share/18hCXkXpHB/?mibextid=wwXIfr" },
  { Icon: Mail, label: "Email", href: "mailto:thewellnesshubnj@gmail.com" },
];

// ══════════════════════════════════════════════
// PAGE COMPONENT
// ══════════════════════════════════════════════
// ─────────────────────────────────────────────
// PHONE FORMATTER
// Strips everything except digits, then builds
// +1 (XXX) XXX-XXXX as the user types.
// Only US numbers (10 digits after country code).
// ─────────────────────────────────────────────
function formatPhone(raw: string): string {
  // Keep only digits
  const digits = raw.replace(/\D/g, "");

  // Remove a leading 1 so we always work with 10 digits
  const d = digits.startsWith("1") ? digits.slice(1) : digits;

  if (d.length === 0) return "";
  if (d.length <= 3) return `+1 (${d}`;
  if (d.length <= 6) return `+1 (${d.slice(0, 3)}) ${d.slice(3)}`;
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 10)}`;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
      });
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <>
      {/* ══ NAV ══════════════════════════════════ */}
      <nav
        style={{ backgroundColor: "var(--almond)", borderBottom: "1px solid var(--desert-sand)" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[6%] h-[70px]"
      >
        <a href="#home" className="flex items-center gap-3 no-underline">
          <Logo size={32} color="var(--green)" />
          <div>
            <p style={{ fontFamily: "var(--font-playfair)", color: "var(--green)", fontSize: "15px", fontWeight: 700, lineHeight: 1.1 }}>
              The Wellness Hub
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans)", color: "var(--dry-sage)", fontSize: "9px", fontWeight: 400, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Rewind · Rejuvenate · Recharge
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-9 list-none m-0 p-0">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--green)", fontSize: "12px", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
                className="transition-opacity hover:opacity-50"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            {/* CTA: "Sign Up for Updates" — green filled OriginButton */}
            <OriginButton
              onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
              className="!h-10 !px-5 !text-[11px] !tracking-[0.1em] !uppercase !rounded-sm"
              style={BTN.terracotta}
            >
              Sign Up for Updates
            </OriginButton>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} color="var(--green)" /> : <Menu size={22} color="var(--green)" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{ backgroundColor: "var(--almond)", borderBottom: "1px solid var(--desert-sand)" }}
          className="fixed top-[70px] left-0 right-0 z-40 px-[6%] py-6 flex flex-col gap-5"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--green)", fontSize: "15px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#signup"
            onClick={() => setMenuOpen(false)}
            style={{ fontFamily: "var(--font-dm-sans)", color: "var(--green)", fontSize: "15px", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontWeight: 500 }}
          >
            Sign Up for Updates
          </a>
        </div>
      )}

      {/* ══ HERO ═════════════════════════════════ */}
      <section
        id="home"
        className="min-h-screen pt-[70px] grid md:grid-cols-2"
        style={{ backgroundColor: "var(--almond)", position: "relative", overflow: "hidden" }}
      >
        {/* Decorative watermark lotus — oversized, partially off-screen bottom-right of text column */}
        <div style={{ position: "absolute", top: "40px", left: "-80px", width: "750px", height: "750px", opacity: 0.09, pointerEvents: "none", zIndex: 0 }}>
          <Image src="/logo.png" alt="" fill style={{ objectFit: "contain" }} aria-hidden="true" unoptimized />
        </div>

        <div className="flex flex-col justify-center px-[8%] py-20 md:py-24" style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dry-sage)", fontWeight: 500, marginBottom: "24px" }}>
              Welcome to The Wellness Hub
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(38px, 4.5vw, 64px)", fontWeight: 700, lineHeight: 1.08, textTransform: "uppercase", letterSpacing: "-0.01em", color: "var(--green)", marginBottom: "28px" }}>
              Restore<br />Your Body.<br />
              <AnimatedTagline />
            </h1>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.8, color: "var(--green)", opacity: 0.65, maxWidth: "400px", marginBottom: "40px", fontWeight: 300 }}>
              Where traditional healing methods meet cutting-edge AI wellness technology. A sanctuary designed entirely around you.
            </p>

            {/* CTA: "Explore Our Services" — outline OriginButton */}
            <OriginButton
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              className="!h-12 !px-8 !text-[11px] !tracking-[0.14em] !uppercase !rounded-sm !w-fit"
              style={BTN.outline}
            >
              Explore Our Services <ArrowRight size={14} />
            </OriginButton>
          </FadeIn>
        </div>

        {/* HERO IMAGE — replace HERO_IMAGE constant at top of file to change this */}
        <div className="relative overflow-hidden min-h-[50vh] md:min-h-full">
          <Image
            src={HERO_IMAGE}
            alt="Serene spa environment"
            fill
            className="object-cover"
            priority
          />
          <div
            style={{ background: "linear-gradient(to right, var(--almond) 0%, transparent 25%)" }}
            className="absolute inset-0 hidden md:block"
          />
        </div>
      </section>

      {/* ══ SERVICES ══════════════════════════════
          Images + names are in the SERVICES array at the top of this file.
          Add/remove/edit service cards there.
      ══════════════════════════════════════════ */}
      <section
        id="services"
        style={{ backgroundColor: "var(--almond)", padding: "100px 8%" }}
      >
        <FadeIn className="text-center mb-16">
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dry-sage)", fontWeight: 500, marginBottom: "14px" }}>
            What We Offer
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, textTransform: "uppercase", color: "var(--green)", marginBottom: "20px" }}>
            Our Top <span style={{ color: "var(--green)" }}>Services</span>
          </h2>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.8, color: "var(--green)", opacity: 0.65, maxWidth: "580px", margin: "0 auto", fontWeight: 300 }}>
            Customised wellness experiences that align with your lifestyle, goals, and unique needs — blending traditional spa therapies with AI-driven health insights.
          </p>
        </FadeIn>

        {/* Service cards — first 4 in top row, last 3 staggered below centered between them */}
        <div className="flex flex-col gap-8 md:gap-10 mb-14">
          {/* Row 1: 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {SERVICES.slice(0, 4).map((s, i) => (
              <FadeIn key={s.name} delay={i * 80} className="flex flex-col items-center gap-4">
                <div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", border: "2.5px solid var(--dry-sage)", flexShrink: 0, position: "relative" }}>
                  <Image src={s.image} alt={s.alt} fill className="object-cover" unoptimized />
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green)", textAlign: "center" }}>
                  {s.name}
                </p>
              </FadeIn>
            ))}
          </div>
          {/* Row 2: 3 items offset by half a column to sit between items above */}
          <div className="hidden md:grid md:grid-cols-8 gap-8 md:gap-10">
            <div className="col-span-1" />
            {SERVICES.slice(4).map((s, i) => (
              <FadeIn key={s.name} delay={(i + 4) * 80} className="col-span-2 flex flex-col items-center gap-4">
                <div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", border: "2.5px solid var(--dry-sage)", flexShrink: 0, position: "relative" }}>
                  <Image src={s.image} alt={s.alt} fill className="object-cover" unoptimized />
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green)", textAlign: "center" }}>
                  {s.name}
                </p>
              </FadeIn>
            ))}
          </div>
          {/* Mobile: all 3 remaining items in a 2-col grid */}
          <div className="grid grid-cols-2 gap-8 md:hidden">
            {SERVICES.slice(4).map((s, i) => (
              <FadeIn key={s.name} delay={(i + 4) * 80} className="flex flex-col items-center gap-4">
                <div style={{ width: "150px", height: "150px", borderRadius: "50%", overflow: "hidden", border: "2.5px solid var(--dry-sage)", flexShrink: 0, position: "relative" }}>
                  <Image src={s.image} alt={s.alt} fill className="object-cover" unoptimized />
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green)", textAlign: "center" }}>
                  {s.name}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTA: "Learn More" — outline OriginButton */}
        <FadeIn className="text-center">
          <OriginButton
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="!h-11 !px-7 !text-[11px] !tracking-[0.14em] !uppercase !rounded-sm !w-fit"
            style={BTN.outline}
          >
            Learn More <ArrowRight size={13} />
          </OriginButton>
        </FadeIn>
      </section>

      {/* ══ ABOUT ═════════════════════════════════
          About image is controlled by ABOUT_IMAGE constant at the top of this file.
          Body text lives inline below — edit the array of paragraph strings.
      ══════════════════════════════════════════ */}
      <section
        id="about"
        style={{ backgroundColor: "var(--almond)", padding: "100px 8%" }}
        className="grid md:grid-cols-2 gap-16 md:gap-20 items-center"
      >
        <FadeIn>
          {/* ABOUT IMAGE — replace ABOUT_IMAGE constant at top of file to change */}
          <div style={{ borderRadius: "2px", overflow: "hidden", aspectRatio: "4/5", position: "relative" }}>
            <Image src={ABOUT_IMAGE} alt="Calming spa interior" fill className="object-cover" unoptimized />
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dry-sage)", fontWeight: 500, marginBottom: "14px" }}>
            Our Story
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(26px, 2.8vw, 40px)", fontWeight: 700, textTransform: "uppercase", color: "var(--green)", marginBottom: "28px", lineHeight: 1.15 }}>
            About <span style={{ color: "var(--green)" }}>The Wellness Hub</span>
          </h2>

          {/* Edit your about text here — update or replace any of these paragraphs */}
          {[
            "The Wellness Hub was born from a simple belief: true wellness is not a luxury. It's a necessity. We set out to create a space where every visit feels like a full reset; where healing traditions and modern science come together seamlessly.",
            "The Wellness Hub brings together innovative therapies designed to support recovery, performance, longevity, beauty, and overall wellbeing. From AI-enhanced Pilates sessions and infrared treadmill training to whole-body cryotherapy and advanced skincare treatments, every service is carefully selected to help you achieve more in less time.",
            "What sets us apart is our integration of AI-powered fitness insights with hands-on, human-centred care. Before your appointment, our wellness AI analyses your health goals, stress levels, and lifestyle to craft a session that's uniquely yours. We began with a vision of a wellness experience that evolves with you. Whether you're seeking relief from daily stress, a boost to your immune system, or a moment of mindful escape, The Wellness Hub was designed to meet you where you are and help you become the best version of yourself. To top it all off, we ensured AI integration to get an experience specific to you and your needs. We thought, why not use technology to enhance the personal touch of wellness?",
          ].map((text, i) => (
            <p
              key={i}
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.85, color: "var(--green)", opacity: 0.7, fontWeight: 300, marginBottom: "16px" }}
            >
              {text}
            </p>
          ))}

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", paddingTop: "28px", borderTop: "1px solid var(--dry-sage)", marginBottom: "32px", marginTop: "16px" }}
          >
            {[
              { number: "4+", label: "Core Services" },
              { number: "AI", label: "Powered Insights" },
              { number: "100%", label: "Personalised" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <span style={{ fontFamily: "var(--font-playfair)", fontSize: "30px", fontWeight: 700, color: "var(--green)", display: "block" }}>{s.number}</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green)", opacity: 0.5, marginTop: "4px", display: "block" }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* CTA: "Stay Updated" — outline OriginButton */}
          <OriginButton
            onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
            className="!h-11 !px-7 !text-[11px] !tracking-[0.14em] !uppercase !rounded-sm !w-fit"
            style={BTN.outline}
          >
            Stay Updated <ArrowRight size={13} />
          </OriginButton>
        </FadeIn>
      </section>

      {/* ══ BOOKING ═══════════════════════════════
          Pricing cards are sourced from PRICING array at top of file.
          Update tier names, features, and prices there.
      ══════════════════════════════════════════ */}
      <section
        id="booking"
        style={{ backgroundColor: "var(--desert-sand)", padding: "100px 8%", textAlign: "center" }}
      >
        <FadeIn>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dry-sage)", fontWeight: 500, marginBottom: "14px" }}>
            Reserve Your Experience
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, textTransform: "uppercase", color: "var(--green)", marginBottom: "28px" }}>
            Book Your <span style={{ color: "var(--green)" }}>Session</span>
          </h2>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--almond)", border: "1px solid var(--persian-orange)", color: "var(--green)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", padding: "10px 24px", borderRadius: "100px", fontFamily: "var(--font-dm-sans)", fontWeight: 500, marginBottom: "60px" }}
          >
            <Sparkles size={12} color="var(--persian-orange)" /> Coming Soon — Booking Under Construction
          </span>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[900px] mx-auto opacity-60 pointer-events-none">
          {PRICING.map((p) => (
            <div
              key={p.tier}
              style={{
                background: "var(--almond)",
                border: p.featured ? "2px solid var(--persian-orange)" : "1px solid rgba(29,106,27,0.15)",
                boxShadow: p.featured ? "0 4px 24px rgba(197,140,109,0.18)" : "none",
                borderRadius: "2px",
                padding: "36px 24px",
                textAlign: "left",
              }}
            >
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--persian-orange)", marginBottom: "10px", fontWeight: 500 }}>
                {p.tier}{p.featured ? " — Most Popular" : ""}
              </p>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "24px", fontWeight: 700, color: "var(--green)", marginBottom: "6px" }}>{p.name}</p>
              <p style={{ fontFamily: "var(--font-playfair)", fontSize: "34px", fontWeight: 400, color: "var(--green)", marginBottom: "24px" }}>
                $<span style={{ fontSize: "15px", opacity: 0.45 }}>TBD</span>
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "var(--green)", lineHeight: 1.75, fontWeight: 300, marginBottom: "28px" }}>
                {p.blurb}
              </p>
              <button style={{ width: "100%", background: "var(--green)", border: "1px solid var(--green)", color: "var(--almond)", padding: "12px", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-dm-sans)", fontWeight: 500, borderRadius: "2px", cursor: "not-allowed" }}>
                Reserve
              </button>
            </div>
          ))}
        </div>

        <FadeIn>
          <p style={{ marginTop: "44px", fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "var(--green)", letterSpacing: "0.04em", fontWeight: 300, opacity: 0.7 }}>
            Pricing and availability will be announced at launch. Sign up below to be first to know.
          </p>
        </FadeIn>
      </section>

      {/* ══ SIGN UP FORM ══════════════════════════ */}
      <section
        id="signup"
        style={{ backgroundColor: "var(--almond)", padding: "100px 8%", textAlign: "center" }}
      >
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--dry-sage)", fontWeight: 500, marginBottom: "14px" }}>
              Stay Connected
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, textTransform: "uppercase", color: "var(--green)", marginBottom: "16px", lineHeight: 1.1 }}>
              Be the First<br />to <span style={{ color: "var(--green)" }}>Know</span>
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", lineHeight: 1.8, color: "var(--green)", opacity: 0.6, marginBottom: "44px", fontWeight: 300 }}>
              Sign up to receive updates on our grand opening, exclusive early-access offers, and complimentary wellness tips.
            </p>
          </FadeIn>

          {formState === "success" ? (
            <FadeIn>
              <div style={{ background: "var(--desert-sand)", border: "1px solid var(--dry-sage)", borderRadius: "2px", padding: "28px 24px" }}>
                <p style={{ fontFamily: "var(--font-playfair)", fontSize: "18px", color: "var(--green)", fontWeight: 600 }}>
                  Thank you — we&apos;ll be in touch soon. ✦
                </p>
              </div>
            </FadeIn>
          ) : (
            <FadeIn delay={100}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { id: "fullName", label: "Full Name",     type: "text",  placeholder: "Your full name",  required: true,  optional: false },
                  { id: "email",    label: "Email Address", type: "email", placeholder: "your@email.com", required: true,  optional: false },
                ].map((field) => (
                  <div key={field.id} style={{ textAlign: "left" }}>
                    <label
                      htmlFor={field.id}
                      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--green)", fontWeight: 500, display: "block", marginBottom: "6px" }}
                    >
                      {field.label}{" "}
                      {field.optional && (
                        <span style={{ fontWeight: 400, color: "var(--dry-sage)", textTransform: "none", letterSpacing: 0, fontSize: "10px" }}>
                          (optional)
                        </span>
                      )}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.id]: e.target.value }))}
                      style={{ width: "100%", background: "var(--desert-sand)", border: "1px solid var(--desert-sand)", borderRadius: "2px", padding: "13px 15px", fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--green)", outline: "none", fontWeight: 300 }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--dry-sage)"; e.target.style.background = "var(--almond)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--desert-sand)"; e.target.style.background = "var(--desert-sand)"; }}
                    />
                  </div>
                ))}

                {/* Phone number field — separate so we can apply the formatter */}
                <div style={{ textAlign: "left" }}>
                  <label
                    htmlFor="phone"
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--green)", fontWeight: 500, display: "block", marginBottom: "6px" }}
                  >
                    Phone Number{" "}
                    <span style={{ fontWeight: 400, color: "var(--dry-sage)", textTransform: "none", letterSpacing: 0, fontSize: "10px" }}>(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    value={formData.phone}
                    inputMode="numeric"
                    maxLength={18}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: formatPhone(e.target.value) }))
                    }
                    style={{ width: "100%", background: "var(--desert-sand)", border: "1px solid var(--desert-sand)", borderRadius: "2px", padding: "13px 15px", fontFamily: "var(--font-dm-sans)", fontSize: "14px", color: "var(--green)", outline: "none", fontWeight: 300 }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--dry-sage)"; e.target.style.background = "var(--almond)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--desert-sand)"; e.target.style.background = "var(--desert-sand)"; }}
                  />
                </div>

                <div style={{ marginTop: "6px" }}>
                  {/* CTA: "Notify Me" — green filled OriginButton */}
                  <OriginButton
                    type="submit"
                    loading={formState === "loading"}
                    className="!w-full !h-12 !text-[11px] !tracking-[0.16em] !uppercase !rounded-sm"
                    style={BTN.terracotta}
                  >
                    {formState === "loading" ? "Sending…" : "Notify Me"}
                  </OriginButton>
                </div>

                {formState === "error" && (
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", color: "#c0392b", textAlign: "center" }}>
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </FadeIn>
          )}

          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "var(--green)", opacity: 0.35, marginTop: "16px", letterSpacing: "0.03em" }}>
            We respect your privacy. No spam — ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════
          Social links are in SOCIAL_LINKS array at the top of this file.
          Update hrefs there.
      ══════════════════════════════════════════ */}
      <footer style={{ backgroundColor: "var(--persian-orange)", padding: "60px 8% 36px" }}>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px", marginBottom: "44px", paddingBottom: "32px", borderBottom: "1px solid rgba(29,106,27,0.2)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Logo size={38} />
            <div>
              <p style={{ fontFamily: "var(--font-playfair)", color: "var(--green)", fontSize: "18px", fontWeight: 700, lineHeight: 1.1 }}>
                The Wellness Hub
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", color: "var(--green)", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 400 }}>
                Rewind · Rejuvenate · Recharge
              </p>
            </div>
          </div>

          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "15px", color: "var(--green)", fontStyle: "italic", letterSpacing: "0.06em" }}>
            Rewind. Rejuvenate. Recharge.
          </p>

          {/* Social icons — update hrefs in SOCIAL_LINKS at top of file */}
          <div style={{ display: "flex", gap: "12px" }}>
            {SOCIAL_LINKS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={label}
                style={{ width: "36px", height: "36px", border: "1px solid rgba(29,106,27,0.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
              >
                <Icon size={15} color="var(--green)" />
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "var(--green)", opacity: 0.7, letterSpacing: "0.04em" }}>
            © 2026 The Wellness Hub. All Rights Reserved. Made By Aliza Mirza.
          </p>
          <nav>
            <ul style={{ display: "flex", gap: "24px", listStyle: "none", margin: 0, padding: 0 }}>
              {[...NAV_LINKS, { label: "Contact", href: "#signup" }].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--green)", textDecoration: "none" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
