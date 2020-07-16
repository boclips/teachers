import { Card } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownArrow from 'src/components/layout/navigation/DropdownArrow';
import { Discipline } from '../../types/Discipline';
import DisciplineLogo from './DisciplineLogo';
import './DisciplineCard.less';

interface Props {
  discipline: Discipline;
  className?: string;
}

export const DisciplineCardFull = ({ discipline, className }: Props) => {
  const [isDisciplineOpen, setIsDisciplineOpen] = useState(true);

  if (!discipline) {
    return null;
  }

  const sortSubjects = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (b.name > a.name) {
      return -1;
    }
    return 0;
  };

  const alphabetizedSubjects = discipline.subjects.sort(sortSubjects);

  const basicHeader = (
    <div
      className="discipline-card-wrapper"
      onClick={() => {
        return setIsDisciplineOpen(!isDisciplineOpen);
      }}
    >
      <span className="discipline-card-header">
        <span className="discipline-card-dropdown-arrow">
          <DropdownArrow active={isDisciplineOpen} />
        </span>
        <h1 data-qa="discipline-title" className="discipline-card__title">
          {discipline.name}
        </h1>
      </span>
      <span className="discipline-card__icon">
        <DisciplineLogo discipline={discipline} />
      </span>
    </div>
  );

  return (
    <Card
      data-qa="discipline-card"
      className={`discipline-card ${className}`}
      bordered={false}
      title={basicHeader}
    >
      <div
        className={`discipline-card__body display-tablet-and-desktop ${
          isDisciplineOpen ? 'display-subjects' : null
        }`}
      >
        <ul className="discipline-card__subjects">
          {alphabetizedSubjects.map((subject) => (
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
      </div>
    </Card>
  );
};
