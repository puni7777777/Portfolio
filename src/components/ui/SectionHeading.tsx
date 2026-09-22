'use client'

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: "purple-indigo" | "purple-blue" | "cyan-blue" | "purple-pink";
  className?: string;
  align?: "center" | "left";
}

const GRADIENTS = {
  "purple-indigo": "from-purple-400 to-indigo-500",
  "purple-blue": "from-purple-400 via-purple-500 to-blue-500",
  "cyan-blue": "from-cyan-400 to-blue-500",
  "purple-pink": "from-purple-400 via-pink-400 to-blue-500",
};

export function SectionHeading({
  title,
  subtitle,
  gradient = "purple-indigo",
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-10 sm:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <motion.h1
        className={cn(
          "text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 pb-2 sm:pb-3 leading-tight bg-gradient-to-r bg-clip-text text-transparent drop-shadow-2xl",
          GRADIENTS[gradient]
        )}
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className={cn(
            "text-base sm:text-xl lg:text-2xl text-gray-300 leading-relaxed",
            align === "center" && "max-w-3xl mx-auto"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.section>
  );
}
