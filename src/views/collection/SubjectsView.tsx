import React, { PureComponent } from 'react';
import DisciplineCardList from '../../components/disciplines/DisciplineCardList';

export default class SubjectsView extends PureComponent {
  public render() {
    return (
      <section data-qa="subjects-view-page">
        <DisciplineCardList />
      </section>
    );
  }
}
