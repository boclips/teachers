import { Badge } from 'src/views/bit/badge';
import React from 'react';
import s from './style.module.less';

interface BestForBadgeProps {
  bestFor: string;
}
export const BestForBadge = ({ bestFor }: BestForBadgeProps) => (
  <div className={s.bestFor} data-qa="best-for-badge">
    <Badge value={bestFor} label="Best for:" />
  </div>
);
