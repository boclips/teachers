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
            <Link
              to={`/discover-collections?discipline=${
                this.props.discipline.id
              }`}
              className="link--tabbable discipline-card__link"
            >
              <h1 data-qa="discipline-title" className="discipline-card__title">
                {this.props.discipline.name}
                <span className="discipline-card__icon">
                  <DisciplineLogo discipline={this.props.discipline} />
                </span>
              </h1>
            </Link>
          }
        >
          <div className="discipline-card__body display-tablet-and-desktop">
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
                      className="discipline-card__subject-link link--tabbable"
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
                className="discipline-card__view-all no-underline link--tabbable"
                to={`/discover-collections?discipline=${
                  this.props.discipline.id
                }`}
              >
                view all ({this.props.discipline.subjects.length}) >
              </Link>
            ) : null}
          </div>
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
