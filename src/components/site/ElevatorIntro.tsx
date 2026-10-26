import { useEffect } from "react";

const KEY = "intro-seen";

/** CSS-only elevator doors; an inline script skips it for the rest of the session. */
export function ElevatorIntro() {
  useEffect(() => {
    const t = setTimeout(() => {
      try { sessionStorage.setItem(KEY, "1"); } catch {}
    }, 1300);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.classList.add("intro-seen")}catch(e){}` }} />
      <div className="elevator-intro" aria-hidden="true">
        <div className="door door-l" />
        <div className="door door-r" />
        <div className="door-line" />
      </div>
    </>
  );
}
