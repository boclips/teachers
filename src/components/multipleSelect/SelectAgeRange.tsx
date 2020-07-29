import { SelectValue } from 'antd/lib/select';
import React from 'react';
import MultiSelect from '../common/MultiSelect';
import { AgeRange } from '../../types/AgeRange';

interface Props {
  onChange?: (value: string[]) => void;
  allAgeRanges: AgeRange[];
  initialValue?: string[];
}

export const SelectAgeRange = (props: Props) => {
  const onChange = (value: SelectValue) => {
    const split = value as string[];
    const parsed = split.map((it) => AgeRange.fromJson(it));
    const sorted = AgeRange.removeDuplicates(parsed);
    const stringified = sorted.map((it) => it.encodeJSON());

    props.onChange(stringified);
  };

  const generateOptions = () => {
    const Option = MultiSelect.Option;

    return props.allAgeRanges.map((ageRange) => (
      <Option
        key={ageRange.getLabel()}
        title={ageRange.getLabel()}
        data-qa={ageRange.getId()}
        data-state={ageRange.getLabel()}
        value={ageRange.encodeJSON()}
      >
        {ageRange.getShortLabel()}
      </Option>
    ));
  };

  const filter = (inputValue, option) =>
    option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

  return (
    <MultiSelect
      filterOption={filter}
      mode="multiple"
      placeholder="Choose ages"
      onChange={onChange}
      aria-label="Ages I teach"
      data-qa="age-select"
      defaultValue={props.initialValue}
    >
      {generateOptions()}
    </MultiSelect>
  );
};
