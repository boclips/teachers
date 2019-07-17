import React from 'react';
import CollectionsIcon from '../../../../resources/images/collections-grey.svg';
import ActiveCollectionsIcon from '../../../../resources/images/collections-on.svg';
import ActiveHomeIcon from '../../../../resources/images/home-on.svg';
import HomeIcon from '../../../../resources/images/home.svg';
import ActiveMyVideosIcon from '../../../../resources/images/my-videos-on.svg';
import MyVideosIcon from '../../../../resources/images/my-videos.svg';

import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import NavbarButton from '../navigation/NavbarButton';

const MyCollectionsLink = React.memo(() => (
  <NavbarButton
    link={'/collections'}
    icon={<MyVideosIcon />}
    label={'My videos'}
    activeIcon={<ActiveMyVideosIcon />}
    dataQa={'my-videos'}
    onClick={trackClickMyCollections}
  />
));

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
    dataQa={'video-collections'}
  />
));

const trackClickCollections = () => {
  AnalyticsFactory.getInstance().trackCollectionsNavbarButtonClicked();
};

const trackClickMyCollections = () => {
  AnalyticsFactory.getInstance().trackMyCollectionsNavbarButtonClicked();
};

export { MyCollectionsLink, PublicCollectionsLink, HomeLink };
