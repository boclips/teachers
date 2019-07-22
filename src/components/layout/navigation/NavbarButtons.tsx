import React from 'react';
import CollectionsIcon from '../../../../resources/images/collections-on.svg';
import HomeIcon from '../../../../resources/images/home-on.svg';
import SubjectsIcon from '../../../../resources/images/subjects.svg';

import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import NavbarButton from '../navigation/NavbarButton';

const PublicCollectionsLink = React.memo(() => (
  <NavbarButton
    link={'/public-collections'}
    icon={<CollectionsIcon />}
    label={'Collections'}
    dataQa={'video-collections'}
    onClick={trackClickCollections}
  />
));

const HomeLink = React.memo(() => (
  <NavbarButton
    link={'/'}
    icon={<HomeIcon />}
    label={'Home page'}
    dataQa={'home-page-icon'}
  />
));

const SubjectsLink = React.memo(() => (
  <NavbarButton
    link={'/our-subjects'}
    icon={<SubjectsIcon />}
    label={'Subjects'}
    dataQa={'subjects-page-icon'}
  />
));

const trackClickCollections = () => {
  AnalyticsFactory.getInstance().trackCollectionsNavbarButtonClicked();
};

export { PublicCollectionsLink, HomeLink, SubjectsLink };
