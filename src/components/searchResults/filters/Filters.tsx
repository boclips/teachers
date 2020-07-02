import { Form, Menu } from 'antd';
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
import { extractTotalHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import { AgeFilter } from 'src/components/searchResults/filters/age/AgeFilter';
import { DurationFilter } from 'src/components/searchResults/filters/duration/DurationFilter';
import { SubjectFilter } from 'src/components/searchResults/filters/subject/SubjectFilter';
import { ResourcesFilter } from 'src/components/searchResults/filters/resources/ResourcesFilter';
import State from '../../../types/State';

export const FilterKey = {
  AGE: 'age',
  DURATION: 'duration',
  RESOURCE: 'resourceTypes',
  SUBJECTS: 'subjects',
};

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
    const { resetFields } = props.form;
    const facets = useSelector(
      (state: State) => state.search.videoSearch.facets,
    );

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

    const renderSubMenuTitle = (title: string, key: string) => (
      <span className={'filter-form__submenu-title'}>
        {title}
        {openFilters.indexOf(key) > -1 ? <ArrowUpSVG /> : <ArrowDownSVG />}
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
            {extractTotalHits(facets?.ageRanges) > 0 && (
              <SubMenu
                title={renderSubMenuTitle('Age', FilterKey.AGE)}
                key={FilterKey.AGE}
                className={'filter-form__section'}
              >
                <AgeFilter
                  ageRange={ageRange}
                  form={props.form}
                  formFieldId={'ageRange'}
                />
              </SubMenu>
            )}
            {extractTotalHits(facets?.subjects) > 0 && (
              <SubMenu
                title={renderSubMenuTitle('Subjects', FilterKey.SUBJECTS)}
                key={FilterKey.SUBJECTS}
                className={'filter-form__section'}
              >
                <SubjectFilter
                  subjectIds={subjectIds}
                  form={props.form}
                  formFieldId={'subjects'}
                />
              </SubMenu>
            )}
            {extractTotalHits(facets?.resourceTypes) > 0 && (
              <SubMenu
                title={renderSubMenuTitle('Resources', FilterKey.RESOURCE)}
                key={FilterKey.RESOURCE}
                className={'filter-form__section'}
              >
                <ResourcesFilter
                  resourceTypes={resourceTypes}
                  form={props.form}
                  formFieldId={'resourceTypes'}
                />
              </SubMenu>
            )}
            {extractTotalHits(facets?.durations) > 0 && (
              <SubMenu
                title={renderSubMenuTitle('Duration', FilterKey.DURATION)}
                key={FilterKey.DURATION}
                className={'filter-form__section'}
              >
                <DurationFilter
                  duration={duration}
                  form={props.form}
                  formFieldId={'duration'}
                />
              </SubMenu>
            )}
          </Menu>
        </Form>
      </section>
    );
  },
);

export const FiltersWithForm = withAppliedSearchParameters(
  Form.create<FormComponentProps & Props>({
    onValuesChange: (props, _, allValues: FilterOptions) => {
      const filterRequest: FilterOptions = {};
      filterRequest.duration = allValues.duration;
      filterRequest.ageRange = allValues.ageRange;
      filterRequest.subjects = allValues.subjects;
      filterRequest.resourceTypes = allValues.resourceTypes;

      props.onApplyFilters(filterRequest);
    },
  })(Filters),
);
