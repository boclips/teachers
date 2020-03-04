import React from 'react';
import './NewNoResultsView.less';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { Col, Row } from 'antd';
import { SearchPanelHeader } from 'src/components/searchResults/new/SearchPanelHeader';
import { Link } from 'react-router-dom';
import noResultsIllustration from 'resources/images/no-results-illustration.png';
import BulletDiscSVG from '../../../../resources/images/bullet-disc.svg';

interface Props extends WithAppliedSearchParametersProps {
  query: string | null;
  onOpenFilterDrawer: () => void;
  canUseFilters: boolean;
}
export const NewNoResultsView = withAppliedSearchParameters((props: Props) => {
  if (props.canUseFilters) {
    return (
      <section className="search-zero-results">
        <Row>
          <SearchPanelHeader
            totalElements={0}
            onOpenFilterDrawer={props.onOpenFilterDrawer}
          />
        </Row>
        <Row>{renderHelperMessage(props.query, props.canUseFilters)}</Row>
      </section>
    );
  } else {
    return (
      <React.Fragment>
        <Col xs={{ span: 16, push: 4 }} md={{ span: 12, push: 0 }}>
          <img
            className="ant-col-20"
            src={noResultsIllustration}
            alt="No results illustration"
            data-qa="no-results-image"
          />
        </Col>
        <Col xs={24} md={12}>
          <section className="search-zero-results">
            {renderHelperMessage(props.query, props.canUseFilters)}
          </section>
        </Col>
      </React.Fragment>
    );
  }
});

const renderHelperMessage = (query: string, canUseFilters: boolean) => (
  <div className={'search-zero-results__message'}>
    <h1 data-qa="search-zero-results">
      Oops, we couldn’t find any results that matched your search for{' '}
      <em>{query}</em>
    </h1>
    <p className="description" data-qa="description">
      We&apos;ll look into why we couldn&apos;t find any videos matching your
      search but in the meantime have a look at our tips to improve your search
      results:
    </p>
    <p className="suggestion-title">Our suggestions:</p>
    <ul className="suggestion-ideas">
      {canUseFilters &&
        renderListItem(
          <span>Remove filters to expand the scope of your search.</span>,
          'filterTip',
        )}
      {generalSuggestions.map(renderListItem)}
    </ul>
  </div>
);

const generalSuggestions: JSX.Element[] = [
  <span>Check the spelling of your search term for any typos.</span>,
  <span>Use broader terms or fewer keywords.</span>,
  <span>
    Explore our curated video collections on the{' '}
    <Link to={'/our-subjects'}>Subjects</Link> section.
  </span>,
  <span>
    <a
      href={'mailto:teachers@boclips.com?subject=Help me find videos'}
      target="_blank"
    >
      Get in touch with us{' '}
    </a>
    and we&apos;ll help you find tailored videos.
  </span>,
];

const renderListItem = (element: JSX.Element, key: any): JSX.Element => (
  <li key={key}>
    <BulletDiscSVG className={'suggestion-ideas__icon'} />
    {element}
  </li>
);
