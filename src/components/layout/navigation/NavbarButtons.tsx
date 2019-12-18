import React from 'react';
import HomeIcon from '../../../../resources/images/home-on.svg';
import SubjectsIcon from '../../../../resources/images/subjects.svg';
import NavbarButton from '../navigation/NavbarButton';

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

export { HomeLink, SubjectsLink };
