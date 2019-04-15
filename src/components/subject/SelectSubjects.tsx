import { Select } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React from 'react';
import { Subject } from '../../types/Subject';

interface Props {
  subjects: Subject[];
  onUpdateSubjects: (value: SelectValue) => void;
}

export class SelectSubjects extends React.PureComponent<Props> {
  public render() {
    return (
      <Select
        filterOption={this.filter}
        className={'subjects-selection'}
        mode="multiple"
        placeholder="Subject(s)"
        data-qa="subjects"
        size={'large'}
        onChange={this.props.onUpdateSubjects}
      >
        {this.generateOptions()}
      </Select>
    );
  }

  private generateOptions() {
    const Option = Select.Option;

    this.sortSubjectsByName();

    return this.props.subjects.map(subject => {
      return (
        <Option key={subject.name} value={subject.id} title={subject.name}>
          {subject.name}
        </Option>
      );
    });
  }

  private sortSubjectsByName() {
    this.props.subjects.sort((a: Subject, b: Subject) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  private filter(inputValue, option) {
    return option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }
}
