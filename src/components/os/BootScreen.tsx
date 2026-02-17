"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocaleStore } from "@/stores/localeStore";

interface BootScreenProps {
  onBootComplete: () => void;
}

const bootMessages = {
  fr: [
    "Initialisation du système...",
    "Chargement des composants...",
    "Connexion au portfolio...",
    "Prêt.",
  ],
  en: [
    "Initializing system...",
    "Loading components...",
    "Connecting to portfolio...",
    "Ready.",
  ],
};

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const locale = useLocaleStore((s) => s.locale);
  const t = useLocaleStore((s) => s.t);
  const messages = bootMessages[locale];

  const skipBoot = useCallback(() => {
    setVisible(false);
    setTimeout(onBootComplete, 300);
  }, [onBootComplete]);

  // Reduced motion: skip boot entirely
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onBootComplete();
    }
  }, [onBootComplete]);

  // Skip on click or keypress
  useEffect(() => {
    const handleSkip = () => skipBoot();
    window.addEventListener("keydown", handleSkip);
    return () => {
      window.removeEventListener("keydown", handleSkip);
    };
  }, [skipBoot]);

  useEffect(() => {
    const duration = 3200;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const p = Math.min((step / steps) * 100, 100);
      setProgress(p);

      if (p > 25 && p <= 50) setMessageIndex(1);
      else if (p > 50 && p <= 85) setMessageIndex(2);
      else if (p > 85) setMessageIndex(3);

      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onBootComplete, 600);
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onBootComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-[#050510] flex flex-col items-center justify-center gap-10"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={skipBoot}
        >
          {/* SVG Logo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="38" stroke="url(#bootGrad)" strokeWidth="2" opacity="0.4" />
              <text x="40" y="50" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="36" fontWeight="700" fill="url(#bootGrad)">A</text>
              <defs>
                <linearGradient id="bootGrad" x1="0" y1="0" x2="80" y2="80">
                  <stop stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 blur-3xl opacity-30 bg-blue-500 rounded-full scale-150" />
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-white tracking-widest"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            AnasOS
          </motion.h1>

          {/* Progress bar */}
          <motion.div
            className="w-72"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>

          {/* Boot message */}
          <motion.p
            key={messageIndex}
            className="text-sm text-neutral-500 font-mono"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {messages[messageIndex]}
          </motion.p>

          {/* Skip hint */}
          <motion.p
            className="text-xs text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {t("system.skipBoot")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
