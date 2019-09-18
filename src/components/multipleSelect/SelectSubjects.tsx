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
  value: string[];
  sortedSubjects: Subject[];
}

export class SelectSubjects extends React.PureComponent<Props, State> {
  public static defaultProps = {
    label: '',
  };

  public state = {
    value: this.props.initialValue,
    sortedSubjects: SelectSubjects.sortSubjectsByName(this.props.subjects),
  };

  public componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.subjects !== this.props.subjects) {
      this.setState({
        sortedSubjects: SelectSubjects.sortSubjectsByName(this.props.subjects),
      });
    }
  }

  public render() {
    return (
      <MultiSelect
        filterOption={SelectSubjects.filter}
        mode="multiple"
        placeholder={this.props.placeholder}
        data-qa="subjects"
        onChange={this.onChange}
        aria-label={this.props.placeholder}
        value={this.state.value}
      >
        {this.generateOptions()}
      </MultiSelect>
    );
  }

  private onChange = (newValue: string[]) => {
    this.setState({ value: newValue }, () => {
      this.props.onUpdateSubjects(this.state.value);
    });
  };

  private generateOptions() {
    const Option = MultiSelect.Option;

    return this.state.sortedSubjects.map(subject => {
      return (
        <Option
          key={subject.name}
          value={subject.id}
          title={subject.name}
          data-qa={subject.id}
        >
          {subject.name}
        </Option>
      );
    });
  }

  private static sortSubjectsByName(subjects: Readonly<Subject[]>): Subject[] {
    return [...subjects].sort((a: Subject, b: Subject) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  private static filter(inputValue, option) {
    return option.key.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  }
}
