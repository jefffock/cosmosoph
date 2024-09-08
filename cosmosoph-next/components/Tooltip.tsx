import React, { useState, useRef, useEffect } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactElement;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClickShown, setIsClickShown] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState("600px");

  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(`${Math.min(600, window.innerWidth - 40)}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        setIsClickShown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setIsVisible(!isVisible);
    setIsClickShown(!isVisible);
  };

  const handleMouseEnter = () => {
    if (!isClickShown) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClickShown) {
      setIsVisible(false);
    }
  };

  return (
    <div className="relative inline-block">
      {React.cloneElement(children, {
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      })}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
          style={{
            left: "100%",
            marginLeft: "10px",
            maxWidth: maxWidth,
            width: "max-content",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
