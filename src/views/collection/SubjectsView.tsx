import React from 'react';
import { useLocation } from 'react-router';
import { withMediaBreakPoint } from '../../components/common/higherOrderComponents/withMediaBreakPoint';
import { DisciplineCardList } from '../../components/disciplines/DisciplineCardList';
import PageLayout from '../../components/layout/PageLayout';
import MediaBreakpoints from '../../types/MediaBreakpoints';
import './SubjectsView.less';

export const SubjectsView = withMediaBreakPoint((props) => {
  const screenIsDesktop =
    props.mediaBreakpoint.width > MediaBreakpoints.lg.width;

  const screenIsMobile =
    props.mediaBreakpoint.width < MediaBreakpoints.sm.width;

  const disciplineToFocus = extractHashValue(useLocation().hash);

  return (
    <PageLayout title="Our Subjects" showSearchBar showFooter showNavigation>
      <section data-qa="subjects-view-page" className="subjects-view-page">
        <DisciplineCardList
          columns={screenIsDesktop ? 3 : 2}
          nameToFocusOn={disciplineToFocus}
          screenIsMobile={screenIsMobile}
          displaySubjectsLimited={(discipline) =>
            screenIsMobile && discipline.name !== disciplineToFocus
          }
        />
      </section>
    </PageLayout>
  );
});

const extractHashValue = (hash: string): string => {
  const matchAfterHashtag = /#(.*)/;
  return hash.match(matchAfterHashtag)?.[1];
};
