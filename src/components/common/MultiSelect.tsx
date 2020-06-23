import Select, {SelectProps} from 'antd/lib/select';
import React from 'react';
import './MultiSelect.less';

class MultiSelect extends React.PureComponent<SelectProps<string[]>> {
  public static Option = Select.Option;
  public render() {
    return (
      <Select
        className={'boclips-multi-select-selection'}
        mode="multiple"
        size={'large'}
        dropdownClassName={'dropdown'}
        {...this.props}
      >
        {this.props.children}
      </Select>
    );
  }
}

export default MultiSelect;
