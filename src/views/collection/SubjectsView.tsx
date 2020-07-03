import React, { PureComponent } from 'react';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../components/common/higherOrderComponents/withMediaBreakPoint';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';
import PageLayout from '../../components/layout/PageLayout';
import MediaBreakpoints from '../../types/MediaBreakpoints';
import './SubjectsView.less';

class SubjectsViewComponent extends PureComponent<WithMediaBreakPointProps> {
  public render() {
    const screenIsDesktop =
      this.props.mediaBreakpoint.width > MediaBreakpoints.lg.width;

    return (
      <PageLayout title="Our Subjects" showSearchBar showFooter showNavigation>
        <section data-qa="subjects-view-page" className="subjects-view-page">
          <DisciplineCardList columns={screenIsDesktop ? 3 : 2} />
        </section>
      </PageLayout>
    );
  }
}

export const SubjectsView = withMediaBreakPoint(SubjectsViewComponent);
