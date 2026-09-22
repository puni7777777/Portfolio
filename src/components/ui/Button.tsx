import React, { forwardRef } from "react";
import { motion, MotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps>,
    MotionProps {
  variant?: "default" | "glass" | "outline";
  size?: "default" | "sm" | "lg";
  isLoading?: boolean;
  asChild?: boolean;
}

const MotionSlot = motion.create(Slot);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? MotionSlot : motion.button;

    return (
      <Component
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50",
          {
            "glass-strong px-6 py-3 text-white hover:bg-purple-600/90 hover:shadow-lg hover:shadow-purple-500/30 backdrop-blur-xl":
              variant === "glass",
            "glass bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-600 hover:to-purple-700 text-white h-10 px-4 py-2 shadow-xl hover:shadow-purple-500/30 backdrop-blur-md border-white/20":
              variant === "default",
            "glass-strong border-2 border-purple-400/70 text-purple-400 h-10 px-4 py-2 shadow-lg hover:bg-purple-500/10 hover:border-purple-300 hover:shadow-purple-500/30 backdrop-blur-xl":
              variant === "outline",
            "h-12 px-8 text-lg": size === "lg",
            "h-8 px-3 text-xs": size === "sm",
          },
          className,
        )}
        disabled={isLoading}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export { Button };
