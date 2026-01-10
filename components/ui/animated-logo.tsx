"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export function AnimatedLogo({
  src,
  alt,
  width = 48,
  height = 48,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial states
      if (imageRef.current) {
        gsap.set(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          rotateY: -90,
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          opacity: 0,
          scale: 0.5,
        });
      }

      // Reveal animation sequence
      if (imageRef.current) {
        tl.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      if (glowRef.current) {
        tl.to(
          glowRef.current,
          {
            opacity: 0.6,
            scale: 1.2,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        ).to(
          glowRef.current,
          {
            opacity: 0,
            scale: 1.5,
            duration: 0.5,
            ease: "power2.in",
          },
          "+=0.1"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/50 to-teal-500/50 blur-xl"
        style={{
          width: width * 1.5,
          height: height * 1.5,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Logo image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="relative z-10"
      />
    </div>
  );
}

export default AnimatedLogo;
