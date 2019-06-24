import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { By } from '../../../test-support/By';
import {
  DisciplineFactory,
  SubjectFactory,
} from '../../../test-support/factories';
import { DisciplineCard } from './DisciplineCard';

test('renders a card with title', () => {
  const wrapper = mount(
    <MemoryRouter>
      <DisciplineCard discipline={DisciplineFactory.sample({ name: 'Arts' })} />
    </MemoryRouter>,
  );

  expect(wrapper.find(By.dataQa('discipline-title')).text()).toBe('Arts');
});

test('renders at most 4 first subjects', () => {
  const wrapper = mount(
    <MemoryRouter>
      <DisciplineCard
        discipline={DisciplineFactory.sample({
          subjects: [
            SubjectFactory.sample({ name: 'subject 1' }),
            SubjectFactory.sample({ name: 'subject 2' }),
            SubjectFactory.sample({ name: 'subject 3' }),
            SubjectFactory.sample({ name: 'subject 4' }),
            SubjectFactory.sample({ name: 'subject 5' }),
            SubjectFactory.sample({ name: 'subject 6' }),
          ],
        })}
      />
    </MemoryRouter>,
  );

  expect(wrapper.find(By.dataQa('discipline-subject')).length).toBe(4);

  expect(getSubjectNumber(0)).toBe('subject 1');
  expect(getSubjectNumber(1)).toBe('subject 2');
  expect(getSubjectNumber(2)).toBe('subject 3');
  expect(getSubjectNumber(3)).toBe('subject 4');

  function getSubjectNumber(index: number) {
    return wrapper
      .find(By.dataQa('discipline-subject'))
      .at(index)
      .text();
  }
});

test('renders at subjects when less than 4', () => {
  const wrapper = mount(
    <MemoryRouter>
      <DisciplineCard
        discipline={DisciplineFactory.sample({
          subjects: [SubjectFactory.sample({ name: 'subject 1' })],
        })}
      />
    </MemoryRouter>,
  );

  expect(wrapper.find(By.dataQa('discipline-subject')).length).toBe(1);

  expect(getSubjectNumber(0)).toBe('subject 1');

  function getSubjectNumber(index: number) {
    return wrapper
      .find(By.dataQa('discipline-subject'))
      .at(index)
      .text();
  }
});

test('renders view all when more than 4 subjects', () => {
  const wrapper = mount(
    <MemoryRouter>
      <DisciplineCard
        discipline={DisciplineFactory.sample({
          subjects: [
            SubjectFactory.sample({ name: 'subject 1' }),
            SubjectFactory.sample({ name: 'subject 2' }),
            SubjectFactory.sample({ name: 'subject 3' }),
            SubjectFactory.sample({ name: 'subject 4' }),
            SubjectFactory.sample({ name: 'subject 5' }),
            SubjectFactory.sample({ name: 'subject 6' }),
          ],
        })}
      />
    </MemoryRouter>,
  );

  expect(wrapper.find(By.dataQa('view-all-subjects'))).toExist();
});

test('does not render view all when 4 subjects or less', () => {
  const wrapper = mount(
    <MemoryRouter>
      <DisciplineCard
        discipline={DisciplineFactory.sample({
          subjects: [
            SubjectFactory.sample({ name: 'subject 1' }),
            SubjectFactory.sample({ name: 'subject 2' }),
            SubjectFactory.sample({ name: 'subject 3' }),
            SubjectFactory.sample({ name: 'subject 4' }),
          ],
        })}
      />
    </MemoryRouter>,
  );

  expect(wrapper.find(By.dataQa('view-all-subjects'))).not.toExist();
});
