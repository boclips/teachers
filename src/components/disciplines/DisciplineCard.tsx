import { Card, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ArtsIcon from '../../../resources/images/disciplines/discipline-arts.svg';
import HumanitiesIcon from '../../../resources/images/disciplines/discipline-humanities.svg';
import LanguagesIcon from '../../../resources/images/disciplines/discipline-languages.svg';
import LifeSkillsIcon from '../../../resources/images/disciplines/discipline-life-skills.svg';
import PedagogyIcon from '../../../resources/images/disciplines/discipline-pedagogy.svg';
import StemIcon from '../../../resources/images/disciplines/discipline-stem.svg';
import { Discipline } from '../../types/Discipline';
import './DisciplineCard.less';

interface Props {
  discipline: Discipline;
}

const DisciplineLogo = (props: { code: string }) => (
  <section className="discipline-card__icon">
    <Icon component={ImagesMap[props.code]} />
  </section>
);
const ImagesMap = {
  arts: ArtsIcon,
  humanities: HumanitiesIcon,
  stem: StemIcon,
  'life-skills': LifeSkillsIcon,
  pedagogy: PedagogyIcon,
  languages: LanguagesIcon,
};

export class DisciplineCard extends React.PureComponent<Props> {
  public render() {
    return (
      <Card
        className="discipline-card__container"
        bordered={false}
        title={
          <h1 data-qa="discipline-title" className="discipline-card__title">
            {this.props.discipline.name}
            <DisciplineLogo code={this.props.discipline.code} />
          </h1>
        }
      >
        <ul className="discipline-card__subjects">
          {this.props.discipline.subjects.slice(0, 4).map(subject => (
            <li
              className="discipline-card__subject-item"
              data-qa="discipline-subject"
              key={`subject-${subject.id}`}
            >
              <Link
                to={`/discover-collections?subject=${subject.id}`}
                className="discipline-card__subject-link"
              >
                {subject.name}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    );
  }

  public static Skeleton = () => (
    <section
      className={'discipline-card skeleton ant-skeleton ant-skeleton-active'}
    >
      <section className="ant-skeleton-content">
        <h3 className="discipline-title ant-skeleton-title" />
        <span className="highlight">
          <span />
        </span>
        <section className="discipline-subjects">
          <section className="ant-skeleton-title" />
        </section>
      </section>
    </section>
  );
}
