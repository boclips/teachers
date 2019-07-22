import React from 'react';
import ActiveCollectionsIcon from '../../../../resources/images/collections-on.svg';
import CollectionsIcon from '../../../../resources/images/collections.svg';
import ActiveHomeIcon from '../../../../resources/images/home-on.svg';
import HomeIcon from '../../../../resources/images/home.svg';

import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import NavbarButton from '../navigation/NavbarButton';

const PublicCollectionsLink = React.memo(() => (
  <NavbarButton
    link={'/public-collections'}
    icon={<CollectionsIcon />}
    label={'Collections'}
    activeIcon={<ActiveCollectionsIcon />}
    dataQa={'video-collections'}
    onClick={trackClickCollections}
  />
));

const HomeLink = React.memo(() => (
  <NavbarButton
    link={'/'}
    icon={<HomeIcon />}
    label={'Home page'}
    activeIcon={<ActiveHomeIcon />}
    dataQa={'home-page-icon'}
  />
));

const trackClickCollections = () => {
  AnalyticsFactory.getInstance().trackCollectionsNavbarButtonClicked();
};

export { PublicCollectionsLink, HomeLink };
