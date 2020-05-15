import { Checkbox, Form, Menu } from 'antd';
import CheckboxGroup from 'antd/lib/checkbox/Group';
import { FormComponentProps } from 'antd/es/form';
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
import { extractFacetHits } from 'src/components/searchResults/filters/extractFacetHits';
import { getCollectionsFromSearchResult } from 'src/components/searchBar/redux/reducers/searchReducer';
import State from '../../../types/State';

const FilterKey = {
  AGE: 'age',
  DURATION: 'duration',
  SUBJECTS: 'subjects',
  RESOURCE: 'resource',
};

interface FilterFormEditableFields {
  duration?: string[];
  ageRange?: string[];
  subjects?: string[];
  resourceTypes?: string[];
}

export interface FilterOptions {
  duration?: string[];
  ageRange?: string[];
  subjects?: string[];
  resourceTypes?: string[];
}

interface Props extends StateProps, WithAppliedSearchParametersProps {
  onApplyFilters: (FilterOptions) => void;
}

interface StateProps {
  subjects?: Subject[];
}

const Filters = React.forwardRef(
  (props: FormComponentProps & Props, ref: Ref<any>) => {
    const { ageRange, subjectIds, duration, resourceTypes } = props;
    const { getFieldDecorator, resetFields } = props.form;
    const facets = useSelector(
      (state: State) =>
        state.search.videoSearch.facets || {
          ageRanges: {},
          subjects: {},
          durations: {},
          resourceTypes: {},
        },
    );

    /*
  This is a quick and dirty workaround to the fact that we don't have facets for
  the collection search just now. When we add this, please remove this and forgive me
   */
    const lessonPlanFacet = useSelector(
      (state: State) =>
        getCollectionsFromSearchResult(state).filter(
          (collection) =>
            collection.attachments &&
            collection.attachments.length > 0 &&
            collection.attachments[0].type === 'LESSON_PLAN',
        ).length,
    );

    const durations = useSelector((state: State) => state.durations);
    const durationFilters = durations
      .map((d) => ({
        value: d.toString(),
        label: d.getLabel(),
        count: extractFacetHits(d.toIso(), facets.durations),
      }))
      .filter((filter) => filter.count > 0);

    const allAgeRanges = useSelector((state: State) => state.ageRanges);
    const ageRangeFilters = allAgeRanges
      .map((a) => ({
        label: a.getLabel(),
        value: a.getId(),
        count: extractFacetHits(a.getId(), facets.ageRanges),
      }))
      .filter((filter) => filter.count > 0);

    const subjects = useSelector((state: State) => state.subjects);
    const subjectFilters = subjects
      .map((subject) => ({
        value: subject.id,
        label: subject.name,
        count: extractFacetHits(subject.id, facets.subjects),
      }))
      .filter((filter) => filter.count > 0)
      .sort((a, b) => a.label.localeCompare(b.label));

    const allResourceTypes = useSelector((state: State) => state.resourceTypes);

    const resourceTypeFilters = allResourceTypes
      .map((type) => ({
        value: type.value,
        label: type.label,
        count:
          type.value === 'LESSON_PLAN'
            ? lessonPlanFacet
            : extractFacetHits(type.label, facets.resourceTypes),
      }))
      .filter((filter) => filter.count > 0)
      .sort((a, b) => a.label.localeCompare(b.label));

    const [openFilters, setOpenFilters] = useState(() => [
      FilterKey.AGE,
      FilterKey.SUBJECTS,
      FilterKey.DURATION,
      FilterKey.RESOURCE,
    ]);

    useEffect(() => {
      resetFields();
    }, [resetFields, ageRange, subjectIds, duration, resourceTypes]);

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
                    initialValue: ageRange
                      ? ageRange.map((range) => range.getId())
                      : [],
                    valuePropName: 'value',
                  })(
                    <CheckboxGroup className="filter-form__checkbox-group">
                      {ageRangeFilters.map((item) => (
                        <Checkbox key={item.label} value={item.value}>
                          {item.label}{' '}
                          <span className="filter-form__checkbox-count">
                            ({formatCount(item.count)})
                          </span>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>,
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
                    <CheckboxGroup className="filter-form__checkbox-group filter-form__subjects-group">
                      {subjectFilters.map((item) => (
                        <Checkbox key={item.label} value={item.value}>
                          {item.label}{' '}
                          <span className="filter-form__checkbox-count">
                            ({formatCount(item.count)})
                          </span>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>,
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
                      ? duration.map((range) => range.toString())
                      : [],
                  })(
                    <CheckboxGroup className="filter-form__checkbox-group">
                      {durationFilters.map((item) => (
                        <Checkbox key={item.label} value={item.value}>
                          {item.label}{' '}
                          <span className="filter-form__checkbox-count">
                            ({formatCount(item.count)})
                          </span>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>,
                  )}
                </Form.Item>
              </React.Fragment>
            </SubMenu>
            <SubMenu
              title={renderSubMenuTitle('Resources', FilterKey.RESOURCE)}
              key={FilterKey.RESOURCE}
              className={'filter-form__section'}
            >
              <React.Fragment>
                <Form.Item>
                  {getFieldDecorator('resourceTypes', {
                    initialValue: resourceTypes,
                  })(
                    <CheckboxGroup className="filter-form__checkbox-group">
                      {resourceTypeFilters.map((item) => (
                        <Checkbox key={item.label} value={item.value}>
                          {item.label}{' '}
                          <span className="filter-form__checkbox-count">
                            ({formatCount(item.count)})
                          </span>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>,
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
      filterRequest.resourceTypes = allValues.resourceTypes;

      props.onApplyFilters(filterRequest);
    },
  })(Filters),
);

export function formatCount(count: number): string {
  if (count >= 500) {
    return `${count}+`;
  } else {
    return `${count}`;
  }
}
