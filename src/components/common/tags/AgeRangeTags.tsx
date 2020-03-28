import React from 'react';
import { AgeRangeTag } from './AgeRangeTag';
import { convertAgeRangesFromNumbers } from 'src/components/ageRanges/convertAgeRangesFromNumbers';
import { useSelector } from 'react-redux';
import State from 'src/types/State';

interface Props {
  ageRanges: number[];
  hideLabel: boolean;
}

export const AgeRangeTags = (props: Props) => {
  const allAgeRanges = useSelector((state: State) => state.ageRanges);

  return (
    <>
      {convertAgeRangesFromNumbers(allAgeRanges, props.ageRanges).map(
        (range, index) => (
          <AgeRangeTag
            key={index}
            ageRange={range}
            hideLabel={props.hideLabel}
          />
        ),
      )}
    </>
  );
};
