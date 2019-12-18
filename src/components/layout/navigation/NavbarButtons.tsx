import React from 'react';
import HomeIcon from '../../../../resources/images/home-on.svg';
import SubjectsIcon from '../../../../resources/images/subjects.svg';
import { NavbarRouterButton } from './NavbarRouterButton';
import { NavbarButton } from './NavbarButton';

const HomeLink = React.memo(() => (
  <NavbarRouterButton
    link="/"
    icon={<HomeIcon />}
    label="Home page"
    dataQa="home-page-icon"
  />
));

const SubjectsLink = React.memo(() => (
  <NavbarRouterButton
    link="/our-subjects"
    icon={<SubjectsIcon />}
    label="Subjects"
    dataQa="subjects-page-icon"
  />
));

const TutorialLink = React.memo(() => (
  <NavbarButton
    target="_blank"
    link="https://www.boclips.com/training"
    icon={<SubjectsIcon />}
    label="Tutorials"
    dataQa="tutorials-page-icon"
  />
));

export { HomeLink, SubjectsLink, TutorialLink };
