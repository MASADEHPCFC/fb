import React from 'react';
import DirhamSymbol from '../shared/DirhamSymbol';

export const formatCurrencyWithDirham = (
  amount: number, 
  options: {
    size?: number;
    color?: string;
    showDecimals?: boolean;
  } = {}
): React.ReactNode => {
  const { size = 16, color = 'inherit', showDecimals = false } = options;
  
  const formattedAmount = amount.toLocaleString('en-AE', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      <DirhamSymbol size={size} color={color} />
      {formattedAmount}
    </span>
  );
};

export const formatCurrencyString = (amount: number, showDecimals: boolean = false): string => {
  return amount.toLocaleString('en-AE', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
}; 