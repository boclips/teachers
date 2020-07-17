import { Card } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownArrow from 'src/components/layout/navigation/DropdownArrow';
import { A11yButton } from 'src/components/common/a11y/A11yButton';
import classNames from 'classnames';
import { Discipline } from '../../types/Discipline';
import DisciplineLogo from './DisciplineLogo';
import './DisciplineCard.less';

interface Props {
  discipline: Discipline;
  className?: string;
  closeable?: boolean;
}

export const DisciplineCardFull = ({
  discipline,
  className,
  closeable,
}: Props) => {
  const [isDisciplineOpen, setIsDisciplineOpen] = useState(closeable);

  if (!discipline) {
    return null;
  }

  const alphabetizedSubjects = discipline.subjects.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const toggleDisciplineCard = () =>
    closeable && setIsDisciplineOpen(!isDisciplineOpen);

  const basicHeader = (
    <A11yButton callback={toggleDisciplineCard}>
      <div className="discipline-card-wrapper">
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
    </A11yButton>
  );

  return (
    <Card
      data-qa="discipline-card"
      className={`discipline-card ${className}`}
      bordered={false}
      title={basicHeader}
    >
      <div
        className={classNames(
          'discipline-card__body display-tablet-and-desktop',
          { 'display-subjects': isDisciplineOpen },
        )}
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
