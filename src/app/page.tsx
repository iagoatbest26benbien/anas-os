"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Desktop from "@/components/os/Desktop";
import BootScreen from "@/components/os/BootScreen";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [checked, setChecked] = useState(false);

  // Check sessionStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (sessionStorage.getItem("anas-os-booted") === "true") {
      setBooted(true);
    }
    setChecked(true);
  }, []);

  const handleBootComplete = () => {
    setBooted(true);
    sessionStorage.setItem("anas-os-booted", "true");
  };

  // Don't render until we've checked sessionStorage
  if (!checked) {
    return <div className="w-screen h-screen" style={{ backgroundColor: "#0a0a1a" }} />;
  }

  return (
    <>
      {!booted && <BootScreen onBootComplete={handleBootComplete} />}
      <AnimatePresence>
        {booted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
