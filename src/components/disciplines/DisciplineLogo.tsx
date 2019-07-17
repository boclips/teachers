import React from 'react';
import ArtsIconLarge from '../../../resources/images/disciplines/discipline-arts-large.png';
import ArtsIcon from '../../../resources/images/disciplines/discipline-arts.png';
import HumanitiesIconLarge from '../../../resources/images/disciplines/discipline-humanities-large.png';
import HumanitiesIcon from '../../../resources/images/disciplines/discipline-humanities.png';
import LanguagesIconLarge from '../../../resources/images/disciplines/discipline-languages-large.png';
import LanguagesIcon from '../../../resources/images/disciplines/discipline-languages.png';
import LifeSkillsIconLarge from '../../../resources/images/disciplines/discipline-life-skills-large.png';
import LifeSkillsIcon from '../../../resources/images/disciplines/discipline-life-skills.png';
import PedagogyIconLarge from '../../../resources/images/disciplines/discipline-pedagogy-large.png';
import PedagogyIcon from '../../../resources/images/disciplines/discipline-pedagogy.png';
import StemIconLarge from '../../../resources/images/disciplines/discipline-stem-large.png';
import StemIcon from '../../../resources/images/disciplines/discipline-stem.png';
import { Discipline } from '../../types/Discipline';

const DisciplineLogo = (props: { discipline: Discipline; large?: boolean }) => (
  <img
    src={ImagesMap[`${props.discipline.code}${props.large ? '-large' : ''}`]}
    alt=""
    className="discipline-card__icon__image"
  />
);
const ImagesMap = {
  arts: ArtsIcon,
  humanities: HumanitiesIcon,
  stem: StemIcon,
  'life-skills': LifeSkillsIcon,
  pedagogy: PedagogyIcon,
  languages: LanguagesIcon,
  'arts-large': ArtsIconLarge,
  'humanities-large': HumanitiesIconLarge,
  'stem-large': StemIconLarge,
  'life-skills-large': LifeSkillsIconLarge,
  'pedagogy-large': PedagogyIconLarge,
  'languages-large': LanguagesIconLarge,
};

export default DisciplineLogo;
