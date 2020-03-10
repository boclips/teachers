import { Form, Menu } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { Ref, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { Subject } from 'src/types/Subject';
import ArrowUpSVG from 'resources/images/filters-arrow-up.svg';
import ArrowDownSVG from 'resources/images/filters-arrow-down.svg';
import { useForm } from 'antd/lib/form/Form';
import State from '../../../../types/State';

const FilterKey = {
  AGE: 'age',
  DURATION: 'duration',
  SUBJECTS: 'subjects',
};

export interface FilterOptions {
  duration?: string[];
  ageRange?: string[];
  subjects?: string[];
}

interface Props extends StateProps, WithAppliedSearchParametersProps {
  onApplyFilters: (FilterOptions) => void;
}

interface StateProps {
  subjects?: Subject[];
}

const Filters = React.forwardRef((props: Props, ref: Ref<any>) => {
  const { ageRange, subjectIds, duration } = props;
  const [form] = useForm();
  const subjects = useSelector((state: State) => state.subjects);
  const subjectOptions = subjects
    .map(subject => ({
      value: subject.id,
      label: subject.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
  const [openFilters, setOpenFilters] = useState(() => [
    FilterKey.AGE,
    FilterKey.SUBJECTS,
    FilterKey.DURATION,
  ]);

  const resetFields = form.resetFields;
  useEffect(() => {
    resetFields();
  }, [resetFields, ageRange, subjectIds, duration]);



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

  const handleFieldsChange = (_, allFields) => {
    const filterRequest: FilterOptions = {};
    filterRequest.duration = allFields.duration;
    filterRequest.ageRange = allFields.ageRange;
    filterRequest.subjects = allFields.subjects;

    props.onApplyFilters(filterRequest);
  };

  return (
    <section ref={ref}>
      <Form
        form={form}
        className="filter-form"
        onFieldsChange={handleFieldsChange}
        initialValues={{
          ageRange: ageRange ? ageRange.map(range => range.getId()) : [],
          subjects: subjectIds,
          duration: duration ? duration.map(range => range.serialise()) : [],
        }}
      >
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
              <Form.Item name="ageRange">
                <CheckboxGroup
                  className="filter-form__checkbox-group"
                  options={[
                    { label: '3 - 5', value: '3-5' },
                    { label: '5 - 9', value: '5-9' },
                    { label: '9 - 11', value: '9-11' },
                    { label: '11 - 14', value: '11-14' },
                    { label: '14 + ', value: '14-99' },
                    { label: '16 + ', value: '16-99' },
                  ]}
                />
              </Form.Item>
            </React.Fragment>
          </SubMenu>
          <SubMenu
            title={renderSubMenuTitle('Subjects', FilterKey.SUBJECTS)}
            key={FilterKey.SUBJECTS}
            className={'filter-form__section'}
          >
            <React.Fragment>
              <Form.Item
                colon={false}
                name="subjects"
                rules={[{ type: 'array' }]}
              >
                <CheckboxGroup
                  className="filter-form__checkbox-group filter-form__subjects-group"
                  options={subjectOptions}
                />
              </Form.Item>
            </React.Fragment>
          </SubMenu>
          <SubMenu
            title={renderSubMenuTitle('Duration', FilterKey.DURATION)}
            key={FilterKey.DURATION}
            className={'filter-form__section'}
          >
            <React.Fragment>
              <Form.Item name="duration">
                <CheckboxGroup
                  className="filter-form__checkbox-group"
                  options={[
                    { label: '0m - 2m', value: '0-120' },
                    { label: '2m - 5m', value: '120-300' },
                    { label: '5m - 10m', value: '300-600' },
                    { label: '10m - 20m', value: '600-1200' },
                    { label: '20m +', value: '1200' },
                  ]}
                />
              </Form.Item>
            </React.Fragment>
          </SubMenu>
        </Menu>
      </Form>
    </section>
  );
});

export const FiltersWithForm = withAppliedSearchParameters(Filters);
