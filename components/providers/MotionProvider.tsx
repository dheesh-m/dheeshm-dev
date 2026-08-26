"use client";

import { MotionConfig } from "framer-motion";

/**
 * Keeps the root layout a Server Component while still giving framer-motion a
 * global config. `reducedMotion="user"` makes every motion component honour the
 * OS setting without each one checking for itself.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
