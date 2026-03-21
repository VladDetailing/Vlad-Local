import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import OptimizedImg from './OptimizedImg';

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  className?: string;
  beforeAlt?: string;
  afterAlt?: string;
  initialPercent?: number;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
  beforeScale?: number;
  afterScale?: number;
  beforeTranslateX?: number;
  beforeTranslateY?: number;
  afterTranslateX?: number;
  afterTranslateY?: number;
  beforeRotation?: number;
  afterRotation?: number;
};

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  className,
  beforeAlt = 'Înainte',
  afterAlt = 'După',
  initialPercent = 50,
  beforeObjectPosition = '50% 50%',
  afterObjectPosition = '50% 50%',
  beforeScale = 1,
  afterScale = 1,
  beforeTranslateX = 0,
  beforeTranslateY = 0,
  afterTranslateX = 0,
  afterTranslateY = 0,
  beforeRotation = 0,
  afterRotation = 0
}: BeforeAfterSliderProps) {
  const inputId = useId();
  const [percent, setPercent] = useState(initialPercent);
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const directionRef = useRef<1 | -1>(1); // 1 for right, -1 for left

  // Auto-slide animation
  useEffect(() => {
    // Only animate if not hovering and not manually resizing
    if (isHovering || isResizing) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const animate = () => {
      setPercent(prev => {
        let next = prev + (directionRef.current * 0.2); // Speed of 0.2
        
        // Reverse direction at boundaries (with some padding)
        if (next >= 85) {
          next = 85;
          directionRef.current = -1;
        } else if (next <= 15) {
          next = 15;
          directionRef.current = 1;
        }
        
        return next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovering, isResizing]);

  const handleMouseDown = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleLeft = useMemo(() => `${percent}%`, [percent]);
  const clipRight = useMemo(() => `${100 - percent}%`, [percent]);

  const isBeforeHidden = percent < 15;
  const isAfterHidden = percent > 85;

  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPercent = Math.max(0, Math.min((x / rect.width) * 100, 100));
      setPercent(newPercent);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    const handleUp = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className={`relative h-full w-full overflow-hidden select-none ${className ?? ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsResizing(false);
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <OptimizedImg
        src={beforeSrc}
        alt={beforeAlt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: beforeObjectPosition,
          transform: `scale(${beforeScale}) translate(${beforeTranslateX}px, ${beforeTranslateY}px) rotate(${beforeRotation}deg)`
        }}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        draggable={false}
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${clipRight} 0 0)` }}>
        <OptimizedImg
          src={afterSrc}
          alt={afterAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: afterObjectPosition,
            transform: `scale(${afterScale}) translate(${afterTranslateX}px, ${afterTranslateY}px) rotate(${afterRotation}deg)`
          }}
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          draggable={false}
        />
      </div>

      <div 
        className="absolute bottom-0 top-0 w-1 cursor-ew-resize bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: handleLeft }}
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsResizing(true);
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          setIsResizing(true);
        }}
      >
        <div className="absolute top-1/2 -ml-3 -mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-3 w-3 text-gray-800"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-3 w-3 text-gray-800"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      <div 
        className={`pointer-events-none absolute top-3 text-sm font-bold uppercase tracking-wide text-black drop-shadow-[0_0_2px_rgba(59,130,246,1)] transition-all duration-300 ${
          isBeforeHidden ? 'opacity-0' : 'opacity-100'
        } ${isAfterHidden ? 'left-1/2 -translate-x-1/2' : 'left-3'}`}
      >
        înainte
      </div>
      <div 
        className={`pointer-events-none absolute top-3 text-sm font-bold uppercase tracking-wide text-black drop-shadow-[0_0_2px_rgba(59,130,246,1)] transition-all duration-300 ${
          isAfterHidden ? 'opacity-0' : 'opacity-100'
        } ${isBeforeHidden ? 'left-1/2 -translate-x-1/2 right-auto' : 'right-3'}`}
      >
        după
      </div>

      <input
        id={inputId}
        aria-label="Compară înainte și după"
        type="range"
        min={0}
        max={100}
        value={percent}
        onChange={(e) => setPercent(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
