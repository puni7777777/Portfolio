import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "purple" | "emerald" | "neutral";
  size?: "sm" | "md";
  mono?: boolean;
  glow?: boolean;
}

export function Badge({
  className,
  variant = "cyan",
  size = "md",
  mono = false,
  glow = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-colors backdrop-blur-sm border select-none",
        mono ? "font-mono tracking-wider" : "tracking-normal",
        {
          // Sizes
          "px-2 py-0.5 text-xs rounded": size === "sm",
          "px-3 py-1 text-xs rounded-full": size === "md",

          // Color Variants
          "bg-cyan-500/10 text-cyan-300 border-cyan-500/30": variant === "cyan",
          "bg-purple-500/10 text-purple-300 border-purple-500/30": variant === "purple",
          "bg-emerald-500/10 text-emerald-300 border-emerald-500/30": variant === "emerald",
          "bg-zinc-900/80 text-zinc-300 border-zinc-700/60": variant === "neutral",

          // Subtle Ambient Rim Glow
          "shadow-[0_0_12px_rgba(6,182,212,0.25)]": glow && variant === "cyan",
          "shadow-[0_0_12px_rgba(168,85,247,0.25)]": glow && variant === "purple",
          "shadow-[0_0_12px_rgba(16,185,129,0.25)]": glow && variant === "emerald",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
