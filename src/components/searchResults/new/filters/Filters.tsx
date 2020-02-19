import React from 'react';
import { Button, Form, Menu } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';
import { AgeRange } from '../../../../types/AgeRange';
import DurationSlider from '../../filters/DurationSlider';
import State from '../../../../types/State';
import { AppliedFiltersInjectedProps } from '../../filters/AppliedFiltersProvider';
import { SelectSubjects } from '../../../multipleSelect/SelectSubjects';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import { Range } from '../../../../types/Range';
import DropdownArrow from '../../../layout/navigation/DropdownArrow';

interface FilterFormEditableFields {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

interface FilterRequest {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

interface Props {
  onApplyFilters?: () => void;
}

const Filters = (
  props: FormComponentProps & AppliedFiltersInjectedProps & Props,
) => {
  const { getFieldDecorator } = props.form;
  const subjects = useSelector((state: State) => state.subjects);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    props.form.validateFields((_, values: FilterFormEditableFields) => {
      const filterRequest: FilterRequest = {};

      filterRequest.duration = values.duration;
      filterRequest.ageRange = values.ageRange;
      filterRequest.subjects = values.subjects;

      if (
        props.form.isFieldsTouched() ||
        values.subjects !== this.props.subjectIds
      ) {
        dispatch(
          bulkUpdateSearchParamsAction([
            {
              duration_min:
                filterRequest.duration && filterRequest.duration.min,
              duration_max:
                (filterRequest.duration && filterRequest.duration.max) ||
                undefined,
            },
            {
              age_range_min:
                filterRequest.ageRange && filterRequest.ageRange.min,
              age_range_max:
                (filterRequest.ageRange && filterRequest.ageRange.max) ||
                undefined,
            },
            {
              subject: filterRequest.subjects,
            },
          ]),
        );
        props.onApplyFilters();
      }
    });
  };
  return (
    <section>
      <Form className="filter-form" onSubmit={handleSubmit}>
        <Menu
          mode={'inline'}
          defaultOpenKeys={['age', 'subject', 'duration']}
          inlineIndent={0}
          overflowedIndicator={<DropdownArrow active={true} />}
        >
          <SubMenu title={'Age'} key="age" className={'filter-form__section'}>
            <Form.Item>
              {getFieldDecorator('ageRange', {
                initialValue: {
                  min: props.ageRangeMin,
                  max: props.ageRangeMax,
                },
              })(
                <AgeRangeSlider
                  ageRange={new AgeRange(props.ageRangeMin, props.ageRangeMax)}
                  data-qa="age-range-slider"
                />,
              )}
            </Form.Item>
          </SubMenu>
          <SubMenu
            title={'Duration'}
            key="duration"
            className={'filter-form__section'}
          >
            <Form.Item>
              {getFieldDecorator('duration', {
                initialValue: {
                  min: props.durationMin,
                  max: props.durationMax,
                },
              })(
                <DurationSlider
                  min={props.durationMin}
                  max={props.durationMax}
                  data-qa="duration-slider"
                />,
              )}
            </Form.Item>
          </SubMenu>
          <SubMenu
            title={'Subjects'}
            key="subject"
            className={'filter-form__section'}
          >
            <Form.Item colon={false}>
              {getFieldDecorator('subjects', {
                rules: [{ type: 'array' }],
                initialValue: props.subjectIds,
                trigger: 'onUpdateSubjects',
              })(
                <SelectSubjects
                  subjects={subjects}
                  placeholder="Choose from our list.."
                  initialValue={props.subjectIds}
                  data-qa="subject-select"
                />,
              )}
            </Form.Item>
          </SubMenu>
        </Menu>
        <Button htmlType="submit" type={'primary'}>
          Apply filters
        </Button>
      </Form>
    </section>
  );
};

export const FiltersWithForm = Form.create<FormComponentProps & Props>()(
  Filters,
);
