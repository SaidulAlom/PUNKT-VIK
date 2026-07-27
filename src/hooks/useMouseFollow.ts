import { useState, useEffect, useRef } from 'react';

interface Position {
  x: number;
  y: number;
}

export function useMouseFollow(lerpFactor = 0.12) {
  const [mousePos, setMousePos] = useState<Position>({ x: -200, y: -200 });
  const [targetPos, setTargetPos] = useState<Position>({ x: -200, y: -200 });
  const [isHoverSupported, setIsHoverSupported] = useState(true);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Detect mouse hover capability
    if (typeof window !== 'undefined') {
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
      setIsHoverSupported(finePointer.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsHoverSupported(e.matches);
      };
      finePointer.addEventListener('change', handleChange);
      return () => finePointer.removeEventListener('change', handleChange);
    }
  }, []);

  useEffect(() => {
    if (!isHoverSupported) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHoverSupported]);

  useEffect(() => {
    if (!isHoverSupported) return;

    const updatePosition = () => {
      setMousePos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;

        // If very close, snap to target
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
          return targetPos;
        }

        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor,
        };
      });

      animFrameRef.current = requestAnimationFrame(updatePosition);
    };

    animFrameRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [targetPos, lerpFactor, isHoverSupported]);

  return { mousePos, targetPos, isHoverSupported };
}
