import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Discipline } from '../../types/Discipline';
import './DisciplineCard.less';
import DisciplineLogo from './DisciplineLogo';

interface Props {
  discipline: Discipline;
}

export class DisciplineCard extends React.PureComponent<Props> {
  public render() {
    return (
      this.props.discipline && (
        <Card
          data-qa="discipline-card"
          className="discipline-card__container"
          bordered={false}
          title={
            <h1 data-qa="discipline-title" className="discipline-card__title">
              <Link
                to={`/discover-collections?discipline=${
                  this.props.discipline.id
                }`}
              >
                {this.props.discipline.name}
                <section className="discipline-card__icon">
                  <DisciplineLogo discipline={this.props.discipline} />
                </section>
              </Link>
            </h1>
          }
        >
          <ul className="discipline-card__subjects">
            {this.props.discipline.subjects &&
              this.props.discipline.subjects.slice(0, 4).map(subject => (
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
          {this.props.discipline &&
          this.props.discipline.subjects &&
          this.props.discipline.subjects.length > 4 ? (
            <Link
              data-qa="view-all-subjects"
              className="discipline-card__view-all no-underline"
              to={`/discover-collections?discipline=${
                this.props.discipline.id
              }`}
            >
              view all ({this.props.discipline.subjects.length}) >
            </Link>
          ) : null}
        </Card>
      )
    );
  }

  public static Skeleton = () => (
    <section
      className={
        'discipline-card__container skeleton ant-skeleton ant-skeleton-active'
      }
    >
      <section className="ant-skeleton-content">
        <h3 className="discipline-title ant-skeleton-title" />
        <span className="highlight">
          <span />
        </span>
        <section className="discipline-subjects">
          <section className="ant-skeleton-title" />
          <section className="ant-skeleton-title" />
          <section className="ant-skeleton-title" />
          <section className="ant-skeleton-title" />
          <section className="ant-skeleton-title" />
        </section>
      </section>
    </section>
  );
}