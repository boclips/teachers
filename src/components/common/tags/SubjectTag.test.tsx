import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
  MockStoreFactory,
  SubjectsFactory,
} from '../../../../test-support/factories';
import { ConnectedSubjectTag, SubjectTag } from './SubjectTag';

test('Subject tag renders with correct link URL', () => {
  const wrapper = mount(
    <BrowserRouter>
      <SubjectTag
        subjectName={'Maths'}
        subjectId={'maths-subject-id'}
        clickable={true}
      />
    </BrowserRouter>,
  );

  expect(wrapper.find('ClickableTag').prop('link')).toContain(
    '/discover-collections?subject=maths-subject-id',
  );
});

test('Subject tag does not render as clickable when there is no subject id', () => {
  const wrapper = mount(
    <BrowserRouter>
      <SubjectTag subjectName={'Maths'} clickable={false} />
    </BrowserRouter>,
  );

  expect(wrapper.find('ClickableTag')).not.toExist();
});

test('Connected subject tag resolves to correct name when only id is passed', () => {
  const store = MockStoreFactory.sample({
    subjects: SubjectsFactory.sample([{ id: 'maths-id', name: 'Maths' }]),
  });
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedSubjectTag id={'maths-id'} clickable={true} />
      </BrowserRouter>
    </Provider>,
  );

  expect(wrapper.find('ClickableTag')).toExist();
  expect(wrapper.find('ClickableTag').prop('value')).toEqual('Maths');
});

test('Subject tag is not clickable when readonly', () => {
  const store = MockStoreFactory.sample({
    subjects: SubjectsFactory.sample([{ id: 'maths-id', name: 'Maths' }]),
  });
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedSubjectTag id={'maths-id'} clickable={false} />
      </BrowserRouter>
    </Provider>,
  );

  expect(wrapper.find('ClickableTag')).not.toExist();

  expect(wrapper.find('Tag')).toExist();
  expect(wrapper.find('Tag').prop('value')).toEqual('Maths');
});

test('Subject tag does not render if subject name is not found', () => {
  const store = MockStoreFactory.sample({
    subjects: SubjectsFactory.sample([{ id: 'maths-id', name: 'Maths' }]),
  });
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ConnectedSubjectTag id={'not-maths-id'} clickable={false} />
      </BrowserRouter>
    </Provider>,
  );

  expect(wrapper.find('ClickableTag')).not.toExist();
  expect(wrapper.find('Tag')).not.toExist();
});
