import { Form, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';

import { AgeFilter } from 'src/components/searchResults/filters/age/AgeFilter';
import { DurationFilter } from 'src/components/searchResults/filters/duration/DurationFilter';
import { SubjectFilter } from 'src/components/searchResults/filters/subject/SubjectFilter';
import { ResourcesFilter } from 'src/components/searchResults/filters/resources/ResourcesFilter';
import { extractTotalHits } from 'src/components/searchResults/filters/utils/extractFacetHits';
import SubMenu from 'antd/lib/menu/SubMenu';
import ArrowUpSVG from 'resources/images/filters-arrow-up.svg';
import ArrowDownSVG from 'resources/images/filters-arrow-down.svg';
import { Facet } from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import { FilterOptions } from 'src/components/searchResults/filters/FilterOptions';
import {
  FilterKey,
  allFilterKeys,
} from 'src/components/searchResults/filters/FilterKey';
import State from '../../../types/State';

interface Props extends WithAppliedSearchParametersProps {
  onApplyFilters: (FilterOptions) => void;
  hiddenFilterKeys?: FilterKey[];
}

export const Filters = withAppliedSearchParameters((props: Props) => {
  const {
    ageRange,
    subjectIds,
    duration,
    resourceTypes,
    hiddenFilterKeys,
    onApplyFilters,
  } = props;
  const facets = useSelector((state: State) => state.search.videoSearch.facets);

  const [form] = Form.useForm();
  const onValuesChange = (_, allFilterValues: FilterOptions) =>
    onApplyFilters(allFilterValues);

  const [openFilters, setOpenFilters] = useState(allFilterKeys);
  useEffect(() => {
    form.resetFields();
  }, [form, ageRange, subjectIds, duration, resourceTypes]);

  const renderFilterSection = (
    filterKey: FilterKey,
    label: string,
    facetCounts: { [id: string]: Facet },
    filter: React.ReactNode,
  ) => {
    const isHidden = hiddenFilterKeys?.indexOf(filterKey) > -1;
    const isOpen = openFilters?.indexOf(filterKey) > -1;
    const hasMatchingFacets = extractTotalHits(facetCounts) > 0;

    return !isHidden && hasMatchingFacets ? (
      <SubMenu
        key={filterKey}
        className="filter-form__section"
        title={
          <span className="filter-form__submenu-title">
            {label}
            {isOpen ? <ArrowUpSVG /> : <ArrowDownSVG />}
          </span>
        }
      >
        {filter}
      </SubMenu>
    ) : null;
  };

  return (
    <section>
      <Form form={form} className="filter-form" onValuesChange={onValuesChange}>
        <Menu
          mode="inline"
          openKeys={openFilters}
          inlineIndent={0}
          onOpenChange={(keys: any[]) => setOpenFilters(keys)}
        >
          {renderFilterSection(
            FilterKey.AGE,
            'Age',
            facets?.ageRanges,
            <AgeFilter ageRange={ageRange} name="ageRange" />,
          )}
          {renderFilterSection(
            FilterKey.SUBJECTS,
            'Subjects',
            facets?.subjects,
            <SubjectFilter subjectIds={subjectIds} name="subjects" />,
          )}
          {renderFilterSection(
            FilterKey.RESOURCE,
            'Resources',
            facets?.resourceTypes,
            <ResourcesFilter
              resourceTypes={resourceTypes}
              name="resourceTypes"
            />,
          )}
          {renderFilterSection(
            FilterKey.DURATION,
            'Duration',
            facets?.durations,
            <DurationFilter duration={duration} name="duration" />,
          )}
        </Menu>
      </Form>
    </section>
  );
});
