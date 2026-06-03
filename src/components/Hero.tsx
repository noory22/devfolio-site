import { motion } from "motion/react";
import Scene3D from "./Scene3D";

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Hero({ isActive }: { isActive?: boolean }) {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] min-h-screen w-full max-w-[100vw] flex items-center justify-center pt-safe-nav px-4 sm:px-6 overflow-hidden bg-dark-bg"
    >
      {/* Immersive 3D Background */}
      <Scene3D />

      {/* Enhanced Grid Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] mask-radial pointer-events-none" />

      {/* Gradient ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent pointer-events-none" />

      {/* Radial light burst on entry */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 3.5, opacity: [0, 0.12, 0] }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/20 pointer-events-none blur-2xl"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Title with fluid responsive sizing */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[1.1] tracking-tighter mb-4 sm:mb-6"
            style={{ fontSize: "clamp(2rem, 6vw + 1rem, 7rem)" }}
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              AI Driven Healthcare
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">
              Technologies
            </span>
          </motion.h1>

          {/* Subtitle with fluid responsive sizing */}
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold leading-[1.2] mb-6 sm:mb-8 max-w-4xl mx-auto"
            style={{ fontSize: "clamp(1.1rem, 3.5vw + 0.5rem, 4rem)" }}
          >
            <span className="text-gradient bg-gradient-to-r from-brand-cyan via-brand-blue to-purple-400 bg-clip-text text-transparent">
              Building the Future of Clinical Intelligence in the USA
            </span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent mx-auto mb-8 sm:mb-10"
          />

          {/* Presenter Info with fluid responsive sizing */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2 sm:space-y-3"
          >
            <p
              className="text-white font-bold tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 5vw + 0.5rem, 6rem)" }}
            >
              Dr. Murtaza Najabat Ali
            </p>
            <p
              className="text-brand-cyan/80 font-light tracking-wide"
              style={{ fontSize: "clamp(0.85rem, 2.5vw + 0.4rem, 4rem)" }}
            >
              Chief Executive Officer, Revive Medical Technologies
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced decorative floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: i % 2 === 0 ? "#00E0FF" : "#4A00FF",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.8, 1],
          }}
          transition={{
            duration: 4 + i * 0.6,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Additional subtle glow orbs */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-64 h-64 rounded-full bg-brand-blue/5 pointer-events-none blur-3xl"
          style={{
            left: `${15 + i * 35}%`,
            top: `${60 + (i % 2) * 20}%`,
          }}
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  );
}