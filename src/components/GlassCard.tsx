
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const GlassCard = ({ children, className, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "bg-white/90 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-4 sm:p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
