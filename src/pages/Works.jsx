// src/pages/Work.jsx
import { motion } from "framer-motion";

const services = [
  "production",
  "mixing",
  "recording",
  "mastering",
  "immersive mixing",
  "sound for picture",
];

const fade = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Work() {
  return (
    <main className="pt-28 pb-24 px-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-light tracking-tight mb-12"
        >
          services
        </motion.h1>

        {/* Services List */}
        <ul className="flex flex-col gap-6 md:gap-8">
          {services.map((service, i) => (
            <motion.li
              key={service}
              custom={i}
              initial="hidden"
              animate="show"
              variants={fade}
              className="
                text-xl md:text-3xl font-light text-neutral-500 dark:text-neutral-400 
                hover:text-black dark:hover:text-white transition-colors duration-300
                cursor-pointer select-none
              "
            >
              {service}
            </motion.li>
          ))}
        </ul>
      </div>
    </main>
  );
}
