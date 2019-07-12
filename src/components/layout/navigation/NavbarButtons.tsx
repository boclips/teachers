import CollectionsIcon from '../../../../resources/images/collections-grey.svg';
import React from 'react';
import MyVideosIcon from '../../../../resources/images/my-videos.svg';
import ActiveCollectionsIcon from '../../../../resources/images/collections-on.svg';
import ActiveMyVideosIcon from '../../../../resources/images/my-videos-on.svg';
import HomeIcon from '../../../../resources/images/home.svg';
import ActiveHomeIcon from '../../../../resources/images/home-on.svg';

import NavbarButton from '../navigation/NavbarButton';

const MyCollectionsLink = React.memo(() =>
    <NavbarButton link={'/collections'} icon={<MyVideosIcon />} label={'My videos'} activeIcon={<ActiveMyVideosIcon />} dataQa={'my-videos'} />
)

const PublicCollectionsLink = React.memo(() =>
    <NavbarButton link={'/public-collections'} icon={<CollectionsIcon />} label={'Collections'} activeIcon={<ActiveCollectionsIcon />} dataQa={'video-collections'} />

)

const HomeLink = React.memo(() =>
    <NavbarButton link={'/'} icon={<HomeIcon />} label={'Home'} activeIcon={<ActiveHomeIcon />} dataQa={'video-collections'} />
)

export {
    MyCollectionsLink,
    PublicCollectionsLink,
    HomeLink
}