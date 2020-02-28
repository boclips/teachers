import React from 'react';
import './NewNoResultsView.less';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { Row } from 'antd';
import { SearchPanelHeader } from 'src/components/searchResults/new/SearchPanelHeader';
import { Link } from 'react-router-dom';
import BulletDiscSVG from '../../../../resources/images/bullet-disc.svg';

interface Props extends WithAppliedSearchParametersProps {
  query: string | null;
  numberOfFiltersApplied: number | undefined;
  onOpenFilterDrawer: () => void;
}
export const NewNoResultsView = withAppliedSearchParameters((props: Props) => {
  const suggestionIdeas: JSX.Element[] = [
    <span>Remove filters to expand the scope of your search.</span>,
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

  return (
    <section className="search-zero-results">
      <Row>
        <SearchPanelHeader
          totalElements={0}
          onOpenFilterDrawer={props.onOpenFilterDrawer}
        />
      </Row>
      <Row>
        <div>
          <h1 data-qa="search-zero-results">
            Oops, we couldn’t find any results that matched your search for{' '}
            <em>{props.query}</em>
          </h1>
          <p className="description" data-qa="description">
            We&apos;ll look into why we couldn&apos;t find any videos matching
            your search but in the meantime have a look at our tips to improve
            your search results:
          </p>
          <p className="suggestion-title">Our suggestions:</p>
          <ul className="suggestion-ideas">
            {suggestionIdeas.map((idea, index) => (
              <li key={index}>
                <BulletDiscSVG className={'suggestion-ideas__icon'} />
                {idea}
              </li>
            ))}
          </ul>
        </div>
      </Row>
    </section>
  );
});
