"use client";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit";
}

export function PrimaryButton({ children, onClick, className = "", type = "button" }: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={"btn-primary " + className}
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <span className="btn-text">{children}</span>
      <motion.span
        className="btn-circle"
        variants={{ hover: { x: 5, backgroundColor: "rgba(244,167,185,0.3)" } }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        →
      </motion.span>
    </motion.button>
  );
}

export function GhostButton({ children, onClick, className = "" }: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={"btn-ghost " + className}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
