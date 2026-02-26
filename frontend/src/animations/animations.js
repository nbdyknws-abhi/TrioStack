import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useScrollReveal = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: options.y || 50,
        x: options.x || 0,
        scale: options.scale || 1,
        rotate: options.rotate || 0,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        duration: options.duration || 1,
        ease: options.ease || "power3.out",
        delay: options.delay || 0,
        scrollTrigger: {
          trigger: el,
          start: options.start || "top 80%",
          end: options.end || "bottom 20%",
          toggleActions: options.toggleActions || "play none none reverse",
          once: options.once !== undefined ? options.once : false,
        },
      },
    );
  }, [options]);

  return elementRef;
};

export const useFloat = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    gsap.to(el, {
      y: `+=${options.distance || 20}`,
      duration: options.duration || 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: options.delay || 0,
    });
  }, [options]);

  return elementRef;
};

export const useParallax = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * (options.speedX || 20);
      const yPos = (clientY / innerHeight - 0.5) * (options.speedY || 20);

      gsap.to(el, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [options]);

  return elementRef;
};

export const useMagnetic = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const pull = options.pull || 0.4;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const x = (clientX - centerX) * pull;
      const y = (clientY - centerY) * pull;

      gsap.to(el, {
        x: x,
        y: y,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [options]);

  return elementRef;
};
