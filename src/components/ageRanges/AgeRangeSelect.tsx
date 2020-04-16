import { Select } from 'antd';
import React from 'react';
import './AgeRangeSelect.less';
import { useSelector } from 'react-redux';
import State from 'src/types/State';

export interface Props {
  onChange: (evt: any) => void;
  minValue: number;
  maxValue: number;
}

export const AgeRangeSelect = (props: Props) => {
  const ageRanges = useSelector((state: State) => state.ageRanges);

  const handleMinimumChange = (value: any) => {
    props.onChange({ min: value });
  };

  const handleMaximumChange = (value: any) => {
    props.onChange({ max: value });
  };

  const getMinOptions = () =>
    ageRanges?.map((it) => (
      <Select.Option
        key={it.resolveMin()}
        value={it.resolveMin()}
        disabled={props.maxValue && it.resolveMin() >= props.maxValue}
      >
        {`${it.resolveMin()} years old`}
      </Select.Option>
    ));

  const getMaxOptions = () =>
    ageRanges?.map((it) => (
      <Select.Option
        key={it.resolveMax()}
        value={it.resolveMax()}
        disabled={it.resolveMax() <= props.minValue}
      >
        {it.resolveMax() < 19
          ? `${it.resolveMax()} years old`
          : 'over 16 years old'}
      </Select.Option>
    ));

  return (
    <div className="age-range-select">
      <span className="age-range-select__box">
        <div className="age-range-select__label">from</div>
        <Select
          className="age-range-select__input"
          data-qa="age-select-min"
          onChange={handleMinimumChange}
          value={props.minValue || undefined}
          placeholder="Choose a lower age"
        >
          {getMinOptions()}
        </Select>
      </span>
      <span className="age-range-select__box">
        <div className="age-range-select__label">to</div>
        <Select
          className="age-range-select__input"
          data-qa="age-select-max"
          onChange={handleMaximumChange}
          value={props.maxValue || undefined}
          placeholder="Choose an upper age"
        >
          {getMaxOptions()}
        </Select>
      </span>
    </div>
  );
};
