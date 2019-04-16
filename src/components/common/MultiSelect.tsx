import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import React from 'react';
import './MultiSelect.less';

class MultiSelect extends React.PureComponent<SelectProps> {
  public static Option = Select.Option;
  public render() {
    return (
      <Select
        className={'boclips-multi-select-selection'}
        mode="multiple"
        size={'large'}
        {...this.props}
      >
        {this.props.children}
      </Select>
    );
  }
}

export default MultiSelect;