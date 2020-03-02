import React, { Ref, useEffect } from 'react';
import { Form, Menu } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useSelector } from 'react-redux';
import { AgeRange } from 'src/types/AgeRange';
import { Range } from 'src/types/Range';
import { Subject } from 'src/types/Subject';
import {
  withAppliedSearchFilters,
  WithAppliedSearchFiltersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchFilters';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';
import DurationSlider from '../../filters/DurationSlider';
import State from '../../../../types/State';
import { SelectSubjects } from '../../../multipleSelect/SelectSubjects';
import DropdownArrow from '../../../layout/navigation/DropdownArrow';

interface FilterFormEditableFields {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

export interface FilterOptions {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

interface Props extends StateProps, WithAppliedSearchFiltersProps {
  onApplyFilters: (FilterOptions) => void;
}

interface StateProps {
  subjects?: Subject[];
}

const Filters = React.forwardRef(
  (props: FormComponentProps & Props, ref: Ref<any>) => {
    const { ageRangeMin, ageRangeMax, subjectIds, duration } = props;
    const { getFieldDecorator, resetFields } = props.form;
    const subjects = useSelector((state: State) => state.subjects);

    useEffect(() => {
      resetFields();
    }, [resetFields, ageRangeMin, ageRangeMax, subjectIds, duration]);

    return (
      <section ref={ref}>
        <Form className="filter-form">
          <Menu
            mode={'inline'}
            defaultOpenKeys={['age', 'subject', 'duration']}
            inlineIndent={0}
            overflowedIndicator={<DropdownArrow active={true} />}
          >
            <SubMenu title={'Age'} key="age" className={'filter-form__section'}>
              <React.Fragment>
                <Form.Item>
                  {getFieldDecorator('ageRange', {
                    initialValue: {
                      min: ageRangeMin,
                      max: ageRangeMax,
                    },
                  })(
                    <AgeRangeSlider
                      ageRange={new AgeRange(ageRangeMin, ageRangeMax)}
                      data-qa="age-range-slider"
                    />,
                  )}
                </Form.Item>
              </React.Fragment>
            </SubMenu>
            <SubMenu
              title={'Duration'}
              key="duration"
              className={'filter-form__section'}
            >
              <React.Fragment>
                <Form.Item>
                  {getFieldDecorator('duration', {
                    initialValue: {
                      min: duration && duration.length && duration[0].min,
                      max: duration && duration.length && duration[0].max,
                    },
                  })(
                    <DurationSlider
                      min={duration && duration.length && duration[0].min}
                      max={duration && duration.length && duration[0].max}
                      data-qa="duration-slider"
                    />,
                  )}
                </Form.Item>
              </React.Fragment>
            </SubMenu>
            <SubMenu
              title={'Subjects'}
              key="subject"
              className={'filter-form__section'}
            >
              <React.Fragment>
                <Form.Item colon={false}>
                  {getFieldDecorator('subjects', {
                    rules: [{ type: 'array' }],
                    initialValue: subjectIds,
                  })(
                    <SelectSubjects
                      label=""
                      subjects={subjects}
                      placeholder="Choose from our list.."
                      data-qa="subject-select"
                    />,
                  )}
                </Form.Item>
              </React.Fragment>
            </SubMenu>
          </Menu>
        </Form>
      </section>
    );
  },
);

export const FiltersWithForm = withAppliedSearchFilters(
  Form.create<FormComponentProps & Props>({
    onValuesChange: (
      props,
      _changedValues,
      allValues: FilterFormEditableFields,
    ) => {
      const filterRequest: FilterOptions = {};

      filterRequest.duration = allValues.duration;
      filterRequest.ageRange = allValues.ageRange;
      filterRequest.subjects = allValues.subjects;
      props.onApplyFilters(filterRequest);
    },
  })(Filters),
);
