import { SelectValue } from 'antd/lib/select';
import React from 'react';
import { AgeRange } from '../../types/AgeRange';
import MultiSelect from '../common/MultiSelect';

interface Props {
  onUpdateAgeRange: (value: string[]) => void;
  initialValue?: number[];
}

export class SelectAgeRange extends React.PureComponent<Props> {
  public render() {
    return (
      <MultiSelect
        filterOption={this.filter}
        mode="multiple"
        placeholder="Choose ages"
        onChange={this.onChange}
        aria-label="Ages I teach"
        defaultValue={this.generateInitialValues()}
      >
        {this.generateOptions()}
      </MultiSelect>
    );
  }

  private generateInitialValues() {
    const { initialValue } = this.props;
    if (initialValue) {
      return AgeRange.generateAgeRanges(initialValue).map(age =>
        age.encodeJSON(),
      );
    } else {
      return [];
    }
  }

  private onChange = (value: SelectValue) => {
    const split = value as string[];
    const parsed = split.map(it => AgeRange.decodeJSON(it));
    const sorted = AgeRange.removeDuplicates(parsed);
    const stringified = sorted.map(it => it.encodeJSON());

    this.props.onUpdateAgeRange(stringified);
  };

  private generateOptions() {
    const Option = MultiSelect.Option;

    return AgeRange.allRanges().map(ageRange => {
      return (
        <Option
          key={ageRange.getLabel()}
          title={ageRange.getLabel()}
          data-qa={ageRange.getLabel()}
          value={ageRange.encodeJSON()}
        >
          {ageRange.getLabel()}
        </Option>
      );
    });
  }

  private filter(inputValue, option) {
    return option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }
}
