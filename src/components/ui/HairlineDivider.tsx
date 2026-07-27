import React from 'react';

interface HairlineDividerProps {
  className?: string;
  vertical?: boolean;
}

export const HairlineDivider: React.FC<HairlineDividerProps> = ({ className = '', vertical = false }) => {
  if (vertical) {
    return (
      <div
        className={`w-[1px] h-full bg-[#111110]/10 dark:bg-[#F2F1EE]/10 ${className}`}
        aria-hidden="true"
      />
    );
  }
  return (
    <div
      className={`w-full h-[1px] bg-[#111110]/10 dark:bg-[#F2F1EE]/10 ${className}`}
      aria-hidden="true"
    />
  );
};
