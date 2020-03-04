import { Form, Menu } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/es/form';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { Ref, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { AgeRange } from 'src/types/AgeRange';
import { Range } from 'src/types/Range';
import { Subject } from 'src/types/Subject';
import ArrowUpSVG from 'resources/images/filters-arrow-up.svg';
import ArrowDownSVG from 'resources/images/filters-arrow-down.svg';
import State from '../../../../types/State';
import { AgeRangeSlider } from '../../../common/AgeRangeSlider';

const FilterKey = {
  AGE: 'age',
  DURATION: 'duration',
  SUBJECTS: 'subjects',
};

interface FilterFormEditableFields {
  duration?: string[];
  ageRange?: Range;
  subjects?: string[];
}

export interface FilterOptions {
  duration?: string[];
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
    const subjectOptions = subjects.map(subject => ({
      value: subject.id,
      label: subject.name,
    }));
    const [openFilters, setOpenFilters] = useState(() => [
      FilterKey.AGE,
      FilterKey.SUBJECTS,
      FilterKey.DURATION,
    ]);

    useEffect(() => {
      resetFields();
    }, [resetFields, ageRangeMin, ageRangeMax, subjectIds, duration]);

    const onOpenChange = useCallback((openKeys: string[]) => {
      setOpenFilters(openKeys);
    }, []);

    const isFilterOpen = (key: string) => openFilters.indexOf(key) > -1;

    const renderSubMenuTitle = (title: string, key: string) => (
      <span className={'filter-form__submenu-title'}>
        {title}
        {isFilterOpen(key) ? <ArrowUpSVG /> : <ArrowDownSVG />}
      </span>
    );

    return (
      <section ref={ref}>
        <Form className="filter-form">
          <Menu
            mode={'inline'}
            openKeys={openFilters}
            inlineIndent={0}
            onOpenChange={onOpenChange}
          >
            <SubMenu
              title={renderSubMenuTitle('Age', FilterKey.AGE)}
              key={FilterKey.AGE}
              className={'filter-form__section'}
            >
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
              title={renderSubMenuTitle('Duration', FilterKey.DURATION)}
              key={FilterKey.DURATION}
              className={'filter-form__section'}
            >
              <React.Fragment>
                <Form.Item>
                  {getFieldDecorator('duration', {
                    initialValue: duration
                      ? duration.map(range => range.serialise())
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
              title={renderSubMenuTitle('Subjects', FilterKey.SUBJECTS)}
              key={FilterKey.SUBJECTS}
              className={'filter-form__section'}
            >
              <React.Fragment>
                <Form.Item colon={false}>
                  {getFieldDecorator('subjects', {
                    rules: [{ type: 'array' }],
                    initialValue: subjectIds,
                  })(
                    <CheckboxGroup
                      className="filter-form__checkbox-group filter-form__subjects-group"
                      options={subjectOptions}
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
      filterRequest.duration = allValues.duration;
      filterRequest.ageRange = allValues.ageRange;
      filterRequest.subjects = allValues.subjects;

      props.onApplyFilters(filterRequest);
    },
  })(Filters),
);
