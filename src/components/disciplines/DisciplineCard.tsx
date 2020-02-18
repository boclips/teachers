import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ForwardArrowIcon from 'resources/images/forward-arrow.svg';
import { Discipline } from 'src/types/Discipline';
import { Subject } from 'src/types/Subject';
import DisciplineLogo from './DisciplineLogo';

import './DisciplineCard.less';

interface Props {
  discipline: Discipline;
  className?: string;
}

export class DisciplineCard extends React.PureComponent<Props> {
  public render() {
    if (!this.props.discipline) {
      return null;
    }

    return (
      <Card
        data-qa="discipline-card"
        className={`discipline-card ${this.props.className}`}
        bordered={false}
        title={
          <Link
            to={`/discover-collections?discipline=${this.props.discipline.id}`}
            className="discipline-card__link"
          >
            <h1 data-qa="discipline-title" className="discipline-card__title">
              {this.props.discipline.name}
            </h1>
            <span className="discipline-card__icon">
              <DisciplineLogo discipline={this.props.discipline} />
            </span>
          </Link>
        }
      >
        {this.props.discipline.subjects && (
          <div className="discipline-card__body display-tablet-and-desktop">
            <ul className="discipline-card__subjects">
              {this.sortSubjects(
                this.props.discipline.subjects.slice(0, 4),
              ).map(subject => (
                <li
                  className={'discipline-card__subject-item'}
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
            {this.props.discipline.subjects.length > 4 ? (
              <Link
                data-qa="view-all-subjects"
                className="discipline-card__view-all no-underline link--tabbable"
                to={`/discover-collections?discipline=${this.props.discipline.id}`}
              >
                view all ({this.props.discipline.subjects.length}){' '}
                <ForwardArrowIcon />
              </Link>
            ) : null}
          </div>
        )}
      </Card>
    );
  }

  public static Skeleton = ({ className }: { className?: string }) => (
    <section
      className={`discipline-card skeleton ant-skeleton ant-skeleton-active ${className}`}
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

  private sortSubjects = (subjects: Subject[]) =>
    [...subjects].sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
}
