import Select, {SelectProps, SelectValue} from 'antd/lib/select';
import React from 'react';
import './MultiSelect.less';

class MultiSelect extends React.PureComponent<SelectProps<SelectValue>> {
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
