// src/components/SmoothScroll.tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // Inicializáljuk a Lenis-t
    const lenis = new Lenis({
      duration: 1.2, // Egy picit lejjebb vettem a reakcióidőt a pattogósabb érzetért
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1, // Kicsit emeltem, hogy ne tűnjön fásultnak a görgetés
    });

    // Változó az animációs keret azonosítójának mentéséhez
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf); // Elmentjük az aktuális ciklust
    }

    // Elindítjuk az animációt
    rafId = requestAnimationFrame(raf);

    // Azonnal a lap tetejére ugrunk oldalváltáskor
    lenis.scrollTo(0, { immediate: true });

    // ⚠️ TAKARÍTÁS: Amikor a komponens frissül vagy lecsatolódik,
    // megállítjuk a háttérben futó animációs ciklust és töröljük a Lenis-t.
    return () => {
      cancelAnimationFrame(rafId); // ⬅️ EZ HIÁNYZOTT! Megállítja a processzor pörgetését
      lenis.destroy();
    };
  }, [location]);

  return <>{children}</>;
};

export default SmoothScroll;
