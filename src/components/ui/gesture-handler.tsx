import { useEffect, useRef, useState } from 'react';

interface GestureHandlerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onRotate?: (angle: number) => void;
  threshold?: number;
}

export function GestureHandler({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinch,
  onRotate,
  threshold = 50
}: GestureHandlerProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialAngle, setInitialAngle] = useState<number | null>(null);

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const getAngle = (touch1: Touch, touch2: Touch) => {
    return Math.atan2(
      touch2.clientY - touch1.clientY,
      touch2.clientX - touch1.clientX
    ) * 180 / Math.PI;
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchEnd(null);
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    } else if (e.touches.length === 2) {
      const distance = getDistance(e.touches[0], e.touches[1]);
      const angle = getAngle(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setInitialAngle(angle);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      });
    } else if (e.touches.length === 2 && initialDistance && initialAngle !== null) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const currentAngle = getAngle(e.touches[0], e.touches[1]);
      
      const scale = currentDistance / initialDistance;
      const rotation = currentAngle - initialAngle;
      
      onPinch?.(scale);
      onRotate?.(rotation);
    }
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isLeftSwipe = distanceX > threshold;
    const isRightSwipe = distanceX < -threshold;
    const isUpSwipe = distanceY > threshold;
    const isDownSwipe = distanceY < -threshold;

    if (isLeftSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      onSwipeLeft?.();
    }
    if (isRightSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      onSwipeRight?.();
    }
    if (isUpSwipe && Math.abs(distanceY) > Math.abs(distanceX)) {
      onSwipeUp?.();
    }
    if (isDownSwipe && Math.abs(distanceY) > Math.abs(distanceX)) {
      onSwipeDown?.();
    }

    setTouchStart(null);
    setTouchEnd(null);
    setInitialDistance(null);
    setInitialAngle(null);
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [touchStart, touchEnd, initialDistance, initialAngle]);

  return (
    <div ref={elementRef} className="touch-manipulation">
      {children}
    </div>
  );
}