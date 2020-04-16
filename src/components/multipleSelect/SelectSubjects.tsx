import React, { Ref } from 'react';
import sortBy from 'lodash/sortBy';
import { Subject } from 'src/types/Subject';
import MultiSelect from '../common/MultiSelect';

export interface Props {
  label: string;
  placeholder: string;
  subjects: Subject[];
  onChange?: (value: string[]) => void;
  value?: string[];
}

export interface State {
  sortedSubjects: Subject[];
}

export const SelectSubjects = React.forwardRef(
  (props: Props, ref: Ref<any>) => (
    <MultiSelect
      ref={ref}
      filterOption={(inputValue, option) =>
        option.props.title.toLowerCase().indexOf(inputValue.toLowerCase()) !==
        -1
      }
      placeholder={props.placeholder}
      data-qa="subjects"
      onChange={(value: string[]) => {
        props.onChange(value);
      }}
      aria-label={props.placeholder}
      value={props.value}
    >
      {sortBy(props.subjects, ['name']).map((subject) => (
        <MultiSelect.Option
          key={subject.id}
          value={subject.id}
          data-qa={subject.id}
          title={subject.name}
        >
          {subject.name}
        </MultiSelect.Option>
      ))}
    </MultiSelect>
  ),
);
