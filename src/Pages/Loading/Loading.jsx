import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-base-200">
      {/* Animated Circle Spinner */}
      <motion.div
        className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Text animation */}
      <motion.h1
        className="mt-6 text-2xl font-bold text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          repeatType: "reverse",
        }}
      >
        Loading...
      </motion.h1>

      {/* Floating dots */}
      <motion.div
        className="flex space-x-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
      >
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-3 h-3 rounded-full bg-primary"></div>
      </motion.div>
    </div>
  );
}
