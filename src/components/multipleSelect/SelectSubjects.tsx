import React from 'react';
import { Subject } from '../../types/Subject';
import MultiSelect from '../common/MultiSelect';

export interface Props {
  label?: string;
  placeholder: string;
  subjects: Subject[];
  onUpdateSubjects: (value: string[]) => void;
  initialValue: string[];
}

export interface State {
  subjects: string[];
}

export class SelectSubjects extends React.PureComponent<Props, State> {
  public static defaultProps = {
    label: '',
  };

  public state = {
    subjects: this.props.initialValue,
  };

  public render() {
    return (
      <MultiSelect
        filterOption={this.filter}
        mode="multiple"
        placeholder={this.props.placeholder}
        data-qa="subjects"
        onChange={this.onChange}
        aria-label={this.props.placeholder}
        value={this.state.subjects}
      >
        {this.generateOptions()}
      </MultiSelect>
    );
  }

  private onChange = (newValue: string[]) => {
    this.setState({ subjects: newValue }, () => {
      this.props.onUpdateSubjects(this.state.subjects);
    });
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
