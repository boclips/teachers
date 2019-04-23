import React from 'react';
import { Subject } from '../../types/Subject';
import MultiSelect from '../common/MultiSelect';

interface Props {
  subjects: Subject[];
  onUpdateSubjects: (value: string[]) => void;
}

export class SelectSubjects extends React.PureComponent<Props> {
  public render() {
    return (
      <MultiSelect
        filterOption={this.filter}
        mode="multiple"
        placeholder="Subject(s) I teach"
        data-qa="subjects"
        onChange={this.onChange}
        aria-label="Subjects I teach"
      >
        {this.generateOptions()}
      </MultiSelect>
    );
  }

  private onChange = (value: string[]) => {
    this.props.onUpdateSubjects(value);
  };

  private generateOptions() {
    const Option = MultiSelect.Option;

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
