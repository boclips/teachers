import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { MockStoreFactory } from '../../../test-support/factories';
import { DisciplineCard } from './DisciplineCard';
import DisciplineCardList from './DisciplineCardList';

describe('discipline card limits', () => {
  it('only renders 4 cards when limited to 4', () => {
    const wrapper = mount(
      <Provider store={MockStoreFactory.sample()}>
        <MemoryRouter>
          <DisciplineCardList limit={4} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper.find(DisciplineCard).length).toEqual(4);
  });

  it('renders every discipline when a limit is not given', () => {
    const wrapper = mount(
      <Provider
        store={MockStoreFactory.sample({
          disciplines: [
            {
              code: '123',
              name: 'Arts',
              id: '123',
              subjects: [],
            },
            {
              code: '1234',
              name: 'Humanities',
              id: '12dsfg3',
              subjects: [],
            },
            {
              code: '1235',
              name: 'STEM',
              id: '123efdghb',
              subjects: [],
            },
          ],
        })}
      >
        <MemoryRouter>
          <DisciplineCardList />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(DisciplineCard).length).toEqual(3);
  });
});
