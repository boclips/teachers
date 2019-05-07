import { SelectValue } from 'antd/lib/select';
import React from 'react';
import MultiSelect from '../common/MultiSelect';

interface Props {
  ageRanges: AgeRange[];
  onUpdateAgeRange: (value: number[]) => void;
}

export class SelectAgeRange extends React.PureComponent<Props> {
  public render() {
    return (
      <MultiSelect
        filterOption={this.filter}
        mode="multiple"
        placeholder="Age(s) I teach"
        data-qa="ageRange"
        onChange={this.onChange}
        aria-label="Ages I teach"
      >
        {this.generateOptions()}
      </MultiSelect>
    );
  }

  private onChange = (value: SelectValue) => {
    const combined = this.combineOptions(value);
    const unique = this.removeDulpicates(combined);
    this.props.onUpdateAgeRange(unique);
  };

  private removeDulpicates = (array: any[]) => {
    return Array.from(new Set(array));
  };

  private combineOptions = (value: SelectValue) => {
    const parsed = (value as string[]).map(json => JSON.parse(json));
    return [].concat.apply([], parsed);
  };

  private generateOptions() {
    const Option = MultiSelect.Option;

    return this.props.ageRanges.map(ageRange => {
      return (
        <Option
          key={ageRange.label}
          title={ageRange.label}
          value={JSON.stringify(this.generateRange(ageRange))}
        >
          {ageRange.label}
        </Option>
      );
    });
  }

  private generateRange(ageRange): number[] {
    const arr = [];

    for (let i = ageRange.min; i <= ageRange.max; i++) {
      arr.push(i);
    }

    return arr;
  }

  private filter(inputValue, option) {
    return option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }
}
