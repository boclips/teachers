import React, { PureComponent } from 'react';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../components/common/higerOrderComponents/withMediaBreakPoint';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';
import PageLayout from '../../components/layout/PageLayout';

class SubjectsViewComponent extends PureComponent<WithMediaBreakPointProps> {
  public render() {
    const screenIsDesktop =
      this.props.mediaBreakpoint.width > MediaBreakpoints.lg.width;

    return (
      <PageLayout
        title="Our Subjects"
        showSearchBar={true}
        showFooter={true}
        showNavigation={true}
      >
        <section data-qa="subjects-view-page">
          <DisciplineCardList columns={screenIsDesktop ? 3 : 2} />
        </section>
      </PageLayout>
    );
  }
}

export const SubjectsView = withMediaBreakPoint(SubjectsViewComponent);
