// src/components/SmoothScroll.tsx módosított részlete
import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // ⬅️ Importáljuk a helyzetjelzőt
import Lenis from "@studio-freight/lenis";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation(); // ⬅️ Figyeljük, ha változik az URL / aloldal

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ⬅️ Amikor oldalt vált a látogató, azonnal tekerjük a lap tetejére animáció nélkül
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
    };
  }, [location]); // ⬅️ újra lefut, ha változik az oldal!

  return <>{children}</>;
};

export default SmoothScroll;
