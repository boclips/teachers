import { storiesOf } from '@storybook/react';
import React from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { MockStoreFactory } from '../../../test-support/factories';
import DisciplineCardList from './DisciplineCardList';

storiesOf('DisciplineCardList', module).add('on desktop view', () => (
  <Provider
    store={MockStoreFactory.sample({
      disciplines: [
        {
          code: '123',
          name: 'Maths',
          id: '123',
          subjects: [
            {
              name: 'subject with LP',
              id: 'subject-id',
            },
            {
              name: 'subject without LP',
              id: 'subject-id',
            },
          ],
        },
        {
          code: '1234',
          name: 'STEM',
          id: '12dsfg3',
          subjects: [
            {
              name: 'subject with LP',
              id: 'subject-id',
            },
            {
              name: 'subject without LP',
              id: 'subject-id',
            },
          ],
        },
        {
          code: '1235',
          name: 'Maths',
          id: '123efdghb',
          subjects: [
            {
              name: 'subject with LP',
              id: 'subject-id',
            },
            {
              name: 'subject without LP',
              id: 'subject-id',
            },
          ],
        },
        {
          code: '123',
          name: 'Maths',
          id: '12sgdfs3',
          subjects: [
            {
              name: 'subject with LP',
              id: 'subject-id',
            },
            {
              name: 'subject without LP',
              id: 'subject-id',
            },
          ],
        },
        {
          code: '123',
          name: 'Maths',
          id: '12sdgfvsd3',
          subjects: [
            {
              name: 'subject with LP',
              id: 'subject-id',
            },
            {
              name: 'subject without LP',
              id: 'subject-id',
            },
          ],
        },
      ],
    })}
  >
    <MemoryRouter initialEntries={['/']}>
      <DisciplineCardList limit={4} />
    </MemoryRouter>
  </Provider>
));
