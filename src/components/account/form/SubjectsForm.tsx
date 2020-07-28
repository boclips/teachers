import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import State from 'src/types/State';
import { fetchSubjectsAction } from 'src/components/multipleSelect/redux/actions/fetchSubjectsAction';
import { SelectSubjects } from '../../multipleSelect/SelectSubjects';

interface Props {
  formItemId: string;
  initialValue?: string[];
  label: string;
  placeholder: string;
}
export const SubjectsForm = (props: Props) => {
  const dispatch = useDispatch();
  const allSubjects = useSelector((state: State) => state.subjects);
  useEffect(() => {
    if (!allSubjects || allSubjects.length === 0) {
      dispatch(fetchSubjectsAction());
    }
  }, [dispatch, allSubjects]);
  return (
    <Form.Item
      name={props.formItemId}
      className="form__item"
      label={props.label}
      colon={false}
      rules={[{ type: 'array' }]}
      initialValue={props.initialValue}
    >
      <SelectSubjects
        subjects={allSubjects}
        label={props.label}
        placeholder={props.placeholder}
        data-qa="subject-select"
        value={props.initialValue}
      />
    </Form.Item>
  );
};
