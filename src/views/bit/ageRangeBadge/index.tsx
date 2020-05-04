import {AgeRange} from "src/types/AgeRange";
import {Badge} from "src/views/bit/badge";
import React from "react";
import s from "./style.module.less";

interface AgeRangeBadgeProps {
  ageRange: AgeRange;
  hideAgeRangeLabel: boolean;
}

export const AgeRangeBadge = ({ ageRange, hideAgeRangeLabel }: AgeRangeBadgeProps) => {
  const getAgeRange = ageRange.getShortLabel();
  const isAgeRangeLabelHidden = hideAgeRangeLabel || false;

  return (
    <div className={s.ageRangeBadge} data-qa="age-range-badge">
      <Badge
        value={getAgeRange}
        label={isAgeRangeLabelHidden ? null : 'Ages:'}
      />
    </div>
  );
};
