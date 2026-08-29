"use client";

import React from "react";

interface ScrollSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * Continuous Section Wrapper.
 *
 * Removes artificial per-section entrance delays and hidden opacity states so
 * the entire page behaves as one continuous, smooth physical canvas that
 * glides seamlessly from section to section without hitches.
 */
export default function ScrollSectionWrapper({
  children,
  className = "",
  id,
}: ScrollSectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${className}`}
    >
      {children}
    </section>
  );
}
