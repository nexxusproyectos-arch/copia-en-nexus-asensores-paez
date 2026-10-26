import { animate, motion, useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 0.7, 0.2, 1] as const;

/** Reveal on scroll. Before hydration the content renders visible, so it never stays hidden. */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Only animate elements still below the viewport when JS starts.
    const r = ref.current?.getBoundingClientRect();
    if (r && r.top > window.innerHeight) setReady(true);
  }, []);
  if (!ready) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

/** Staggered children (60ms). Children should be <StaggerItem>. */
export function Stagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r && r.top > window.innerHeight) setReady(true);
  }, []);
  return (
    <motion.div ref={ref} className={className} initial={ready ? "hidden" : false} whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={{ show: { transition: { staggerChildren: 0.06 } } }} key={String(ready)}>
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Counts from 0 to `to` when visible. */
export function CountUp({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref}>{prefix}{v}</span>;
}

/** Slight magnetic follow (max 6px), desktop pointers only. */
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18 });
  const reduce = useReducedMotion();
  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 12);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}
