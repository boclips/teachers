import React, { PureComponent } from 'react';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';
import PageLayout from '../../components/layout/PageLayout';

export class SubjectsView extends PureComponent {
  public render() {
    return (
      <PageLayout showSearchBar={true} showFooter={true} showNavigation={true}>
        <section data-qa="subjects-view-page">
          <DisciplineCardList />
        </section>
      </PageLayout>
    );
  }
}
