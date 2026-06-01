import { motion } from "motion/react";

const navItems = [
  { name: "Intro", index: 0 },
  { name: "AI", index: 8 },
  { name: "Services", index: 17 },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function Navbar({ currentSlide = 0, setCurrentSlide }: { currentSlide?: number, setCurrentSlide?: (i: number) => void }) {
  const isItemActive = (name: string) => {
    if (name === "Intro") return currentSlide < 8;
    if (name === "AI") return currentSlide >= 8 && currentSlide < 17;
    if (name === "Services") return currentSlide >= 17;
    return false;
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed top-2 sm:top-3 md:top-6 lg:top-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-auto max-w-full px-0"
    >
      <div className={`flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 px-3 sm:px-5 md:px-8 lg:px-10 py-1.5 sm:py-2 md:py-3 lg:py-4 rounded-full transition-all duration-700 glass-dark border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
        {navItems.map((item) => {
          const active = isItemActive(item.name);
          return (
            <motion.button
              key={item.name}
              onClick={() => setCurrentSlide && setCurrentSlide(item.index)}
              variants={itemVariants}
              whileHover={{ y: -1, scale: 1.03 }}
              className={`text-[10px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-widest uppercase transition-colors relative group focus:outline-none ${
                active 
                  ? "text-brand-cyan drop-shadow-[0_0_8px_rgba(0,223,216,0.6)]" 
                  : "text-white/50 hover:text-white"
              }`}
            >
              {item.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-brand-cyan transition-all ${
                active ? "w-full shadow-[0_0_10px_rgba(0,223,216,1)]" : "w-0 group-hover:w-full"
              }`} />
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
}
