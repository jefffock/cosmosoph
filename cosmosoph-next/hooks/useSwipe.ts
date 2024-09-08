import { useState, TouchEvent } from "react";

interface SwipeResult {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
  swipeDirection: "left" | "right" | null;
}

export const useSwipe = (threshold = 75): SwipeResult => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(
    null,
  );

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;
    if (isLeftSwipe || isRightSwipe) {
      setSwipeDirection(isLeftSwipe ? "left" : "right");
    } else {
      setSwipeDirection(null);
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    swipeDirection,
  };
};
