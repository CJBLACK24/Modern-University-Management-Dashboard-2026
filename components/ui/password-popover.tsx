/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { evalPassword } from "@/utils/password";

type Props = {
  visible: boolean;
  value: string;
};

const RuleRow = ({ ok, text }: { ok: boolean; text: string }) => (
  <motion.div
    className="flex items-center gap-2 mb-1.5"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {ok ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      >
        <CheckCircle size={16} className="text-green-500" />
      </motion.div>
    ) : (
      <XCircle size={16} className="text-red-500" />
    )}
    <span className={cn("text-sm", ok ? "text-neutral-200" : "text-red-500")}>
      {text}
    </span>
  </motion.div>
);

const StrengthBar = ({ label }: { label: "Weak" | "Medium" | "Strong" }) => {
  const activeCount = label === "Strong" ? 3 : label === "Medium" ? 2 : 1;

  return (
    <div className="flex gap-1.5 mt-2">
      {[0, 1, 2].map((i) => {
        const active = i < activeCount;
        return (
          <motion.div
            key={i}
            className={cn(
              "flex-1 h-1.5 rounded-full",
              active
                ? label === "Strong"
                  ? "bg-green-500"
                  : label === "Medium"
                  ? "bg-yellow-500"
                  : "bg-red-500"
                : "bg-neutral-700"
            )}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.3,
              delay: i * 0.1,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ originX: 0 }}
          />
        );
      })}
    </div>
  );
};

export function PasswordPopover({ visible, value }: Props) {
  const [autoHidden, setAutoHidden] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevVisibleRef = useRef(false);

  const { lenOK, numOK, capOK, label, strengthColor } = useMemo(() => {
    const s = evalPassword(value);
    return {
      lenOK: s.lenOK,
      capOK: s.capOK,
      numOK: s.numOK,
      label: s.label,
      strengthColor:
        s.label === "Strong"
          ? "text-green-500"
          : s.label === "Medium"
          ? "text-yellow-500"
          : "text-red-500",
    };
  }, [value]);

  const allRequirementsMet = lenOK && numOK && capOK;

  // Reset autoHidden when visibility changes from false to true
  useEffect(() => {
    if (visible && !prevVisibleRef.current) {
      setAutoHidden(false);
    }
    prevVisibleRef.current = visible;
  }, [visible]);

  // Auto-hide after 2 seconds when all requirements are met
  useEffect(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    if (visible && allRequirementsMet && !autoHidden) {
      hideTimeoutRef.current = setTimeout(() => {
        setAutoHidden(true);
      }, 2000);
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [visible, allRequirementsMet, autoHidden]);

  const isVisible = visible && !autoHidden;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1], // ease-out cubic
          }}
          className={cn(
            "mt-2.5 py-2.5 px-3 bg-neutral-900 rounded-xl border border-neutral-800",
            "shadow-lg shadow-black/25"
          )}
        >
          <p className="text-sm font-semibold text-neutral-100 mb-2">
            Password must include:
          </p>

          <RuleRow ok={lenOK} text="8–20 characters" />
          <RuleRow ok={capOK} text="At least one uppercase letter" />
          <RuleRow ok={numOK} text="At least one number" />

          <div className="flex items-center gap-1 mt-2.5">
            <span className="text-sm text-neutral-400">Strength:</span>
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn("text-sm font-semibold", strengthColor)}
            >
              {label}
            </motion.span>
          </div>

          <StrengthBar label={label} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PasswordPopover;
