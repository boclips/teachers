import React from 'react';
import { convertAgeRangesFromNumbers } from 'src/components/ageRanges/convertAgeRangesFromNumbers';
import { useSelector } from 'react-redux';
import State from 'src/types/State';
import { AgeRangeTag } from './AgeRangeTag';

interface Props {
  ageRanges: number[];
  hideLabel: boolean;
}

export const AgeRangeTags = (props: Props) => {
  const allAgeRanges = useSelector((state: State) => state.ageRanges);

  return (
    <>
      {convertAgeRangesFromNumbers(allAgeRanges, props.ageRanges).map(
        (range) => (
          <AgeRangeTag
            key={range.getId()}
            ageRange={range}
            hideLabel={props.hideLabel}
          />
        ),
      )}
    </>
  );
};
