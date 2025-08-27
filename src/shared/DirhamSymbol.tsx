import React from 'react';
import DirhamSVG from '../assets/Dirham Currency Symbol - Black.svg';

interface DirhamSymbolProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const DirhamSymbol: React.FC<DirhamSymbolProps> = ({ 
  size = 16, 
  color = 'inherit',
  style = {}
}) => {
  return (
    <img 
      src={DirhamSVG} 
      alt="Dirham" 
      style={{
        width: size,
        height: size,
        display: 'inline-block',
        verticalAlign: 'baseline',
        filter: color !== 'inherit' ? `brightness(0) saturate(100%) ${getColorFilter(color)}` : 'none',
        ...style
      }}
    />
  );
};

// Helper function to convert color to CSS filter (basic implementation)
const getColorFilter = (color: string): string => {
  // This is a simplified implementation. For more colors, you'd need a more robust solution
  switch (color.toLowerCase()) {
    case '#1677ff':
    case 'blue':
      return 'invert(27%) sepia(96%) saturate(7471%) hue-rotate(217deg) brightness(101%) contrast(101%)';
    case 'white':
      return 'invert(100%)';
    case 'black':
    default:
      return '';
  }
};

export default DirhamSymbol; 