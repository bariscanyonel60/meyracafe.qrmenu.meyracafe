"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SESSION_KEY = "meyra-welcome-seen";
const EXIT_AT_MS = 2400;

export default function WelcomeIntro() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") {
        setReady(true);
        return;
      }
    } catch {
      // sessionStorage kapalıysa intro bir kez gösterilir.
    }

    if (prefersReducedMotion) {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // yok say
      }
      setReady(true);
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // yok say
    }

    setActive(true);
    setReady(true);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setActive(false), EXIT_AT_MS);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(exitTimer);
    };
  }, [active]);

  if (!ready) return null;

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="meyra-welcome"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          role="presentation"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 38%, rgba(188,157,119,0.18) 0%, transparent 62%), linear-gradient(165deg, #FAF7F2 0%, #FFFFFF 48%, #F4EDE3 100%)",
            }}
          />

          <motion.div
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#BC9D77]/20 blur-3xl"
            initial={{ opacity: 0.15, scale: 0.85 }}
            animate={{ opacity: [0.15, 0.35, 0.22], scale: [0.85, 1.05, 1] }}
            transition={{ duration: 2.4, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex w-full max-w-md flex-col items-center px-8 text-center sm:max-w-lg">
            <motion.div
              className="relative mb-8 h-36 w-36 sm:mb-10 sm:h-44 sm:w-44"
              initial={{ opacity: 0, filter: "blur(12px)", scale: 0.96 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src="/images/logo/Meyra_Cafe_Orijinal_Logo.png"
                alt="Meyra Cafe"
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain"
              />
            </motion.div>

            <motion.h2
              className="font-serif text-[1.65rem] font-semibold leading-snug tracking-wide text-[#193357] sm:text-3xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Meyra Cafe&apos;ye Hoş Geldiniz
            </motion.h2>

            <motion.p
              className="mt-3 text-[11px] font-medium tracking-[0.18em] text-[#977958] sm:mt-4 sm:text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              Her yudumda ayrı bir keyif.
            </motion.p>

            <motion.div
              className="mt-8 h-px w-12 origin-center bg-[#BC9D77]/70 sm:mt-10"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
