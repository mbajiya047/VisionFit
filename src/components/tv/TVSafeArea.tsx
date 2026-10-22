import React from 'react';

interface TVSafeAreaProps {
  children: React.ReactNode;
  marginPercent?: 0 | 3 | 5;
  className?: string;
}

export const TVSafeArea: React.FC<TVSafeAreaProps> = ({
  children,
  marginPercent = 5,
  className = '',
}) => {
  const paddingStyle = {
    paddingTop: `${marginPercent * 0.8}vh`,
    paddingBottom: `${marginPercent * 0.8}vh`,
    paddingLeft: `${marginPercent * 0.9}vw`,
    paddingRight: `${marginPercent * 0.9}vw`,
  };

  return (
    <div
      style={paddingStyle}
      className={`min-h-screen w-full flex flex-col box-border transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
