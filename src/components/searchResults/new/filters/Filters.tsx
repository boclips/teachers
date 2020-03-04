import { Form, Menu } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/es/form';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { Ref, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { AgeRange } from 'src/types/AgeRange';
import { parseRanges, Range, rangeToString } from 'src/types/Range';
import { Subject } from 'src/types/Subject';
import State from '../../../../types/State';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';
import DropdownArrow from '../../../layout/navigation/DropdownArrow';
import { SelectSubjects } from '../../../multipleSelect/SelectSubjects';

interface FilterFormEditableFields {
  duration?: string[];
  ageRange?: Range;
  subjects?: string[];
}

export interface FilterOptions {
  duration?: Range[];
  ageRange?: Range;
  subjects?: string[];
}

interface Props extends StateProps, WithAppliedSearchParametersProps {
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
                    initialValue: duration
                      ? duration.map(range => rangeToString(range))
                      : [],
                  })(
                    <CheckboxGroup
                      className="filter-form__checkbox-group"
                      options={[
                        { label: '0m - 2m', value: '0-120' },
                        { label: '2m - 5m', value: '120-300' },
                        { label: '5m - 10m', value: '300-600' },
                        { label: '10m - 20m', value: '600-1200' },
                        { label: '20m +', value: '1200' },
                      ]}
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

export const FiltersWithForm = withAppliedSearchParameters(
  Form.create<FormComponentProps & Props>({
    onValuesChange: (props, _, allValues: FilterFormEditableFields) => {
      const filterRequest: FilterOptions = {};
      filterRequest.duration = parseRanges(allValues.duration);
      filterRequest.ageRange = allValues.ageRange;
      filterRequest.subjects = allValues.subjects;

      props.onApplyFilters(filterRequest);
    },
  })(Filters),
);
