import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";

/* -----------------------------------------
   MouseTrail — still subtle & minimal
----------------------------------------- */
function MouseTrail() {
  const [trail, setTrail] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      const isInside = e.target.closest(".hero-container");
      setIsVisible(!!isInside);
      if (!isInside) return;

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const id = Date.now();
      setTrail((prev) => [
        ...prev.slice(-10),
        { id, x: e.clientX, y: e.clientY },
      ]);

      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 350);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[40] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {trail.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute w-2 h-2 rounded-full bg-white/20 blur-sm"
          style={{ left: p.x - 4, top: p.y - 4 }}
        />
      ))}

      <motion.div
        className="absolute w-40 h-40 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        style={{ left: mouseX, top: mouseY }}
      />
    </div>
  );
}

/* -----------------------------------------
   Minimal fade animation
----------------------------------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.1, ease: "easeOut" },
  }),
};

export default function Home() {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-link"));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="pt-14 relative w-full min-h-[calc(100vh-56px)] overflow-hidden">
      {/* Background video under navbar */}
      <div className="absolute inset-0 top-14 hero-container">
        <video
          src="/assets/dove assets/cash_loop_5_nightmode.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-[0.6]"
        />
      </div>

      {/* Soft overlay */}
      <div className="absolute inset-0 top-14 bg-black/40 pointer-events-none" />

      <MouseTrail />

      {/* Center content */}
      <div className="relative z-[45] flex items-center justify-center w-full h-[calc(100vh-56px)] px-6">
        <motion.div
          initial="hidden"
          animate="show"
          className="max-w-3xl text-center text-white"
        >
          {/* Name */}
          <motion.h1
            variants={fadeUp}
            custom={0}
            className="text-6xl md:text-7xl font-light tracking-tight mb-6"
          >
            cash
          </motion.h1>

          {/* Short bio */}
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-base md:text-lg text-white/80 font-light leading-relaxed max-w-xl mx-auto"
          >
            multi-disciplinary artist, producer, engineer,
            <br />
            sound designer, technologist
            <br />
            based in new york city
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/works"
              className="px-8 py-3 rounded-full bg-white text-black text-sm tracking-wide font-medium hover:scale-105 active:scale-95 transition-all"
            >
              View Work
            </Link>

            <a
              href="#"
              className="px-8 py-3 rounded-full border border-white/40 text-white text-sm tracking-wide hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
