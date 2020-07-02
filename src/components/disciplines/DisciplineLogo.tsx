import React from 'react';
import ArtsIcon from '../../../resources/images/disciplines/discipline-arts.svg';
import HumanitiesIcon from '../../../resources/images/disciplines/discipline-humanities.svg';
import LanguagesIcon from '../../../resources/images/disciplines/discipline-languages.svg';
import LifeSkillsIcon from '../../../resources/images/disciplines/discipline-life-skills.svg';
import PedagogyIcon from '../../../resources/images/disciplines/discipline-pedagogy.svg';
import StemIcon from '../../../resources/images/disciplines/discipline-stem.svg';
import { Discipline } from '../../types/Discipline';

interface Props {
  discipline: Discipline;
}

class DisciplineLogo extends React.Component<Props> {
  public ImagesMap = {
    arts: <ArtsIcon data-qa={'arts-icon'} />,
    humanities: <HumanitiesIcon data-qa={'humanities-icon'} />,
    'social-studies': <HumanitiesIcon data-qa={'humanities-icon'} />,
    stem: <StemIcon data-qa={'stem-icon'} />,
    'life-skills': <LifeSkillsIcon data-qa={'life-skills-icon'} />,
    pedagogy: <PedagogyIcon data-qa={'pedagogy-icon'} />,
    'language-arts': <PedagogyIcon data-qa={'pedagogy-icon'} />,
    languages: <LanguagesIcon data-qa={'languages-icon'} />,
  };

  public render() {
    return (
      <React.Fragment>
        {this.ImagesMap[`${this.props.discipline.code}`]}
      </React.Fragment>
    );
  }
}
export default DisciplineLogo;
