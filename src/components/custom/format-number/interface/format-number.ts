type StyleNumberFormat = 'decimal' | 'percent' | 'currency';

interface BaseFormatNumberProps {
  value: number;
  maximumDigits?: number;
  minimumDigits?: number;
  notation?: 'compact' | 'standard' | 'scientific' | 'engineering';
  style?: StyleNumberFormat;
  currencyCode?:
    | 'USD'
    | 'EUR'
    | 'GBP'
    | 'JPY'
    | 'CNY'
    | 'INR'
    | 'AUD'
    | 'CAD'
    | 'CHF'
    | 'NZD';
}

export type { BaseFormatNumberProps };
