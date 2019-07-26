import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SubjectTag } from './SubjectTag';

test('Subject tag renders with correct link URL', () => {
  const wrapper = mount(
    <BrowserRouter>
      <SubjectTag subjectName={'Maths'} subjectId={'maths-subject-id'} />
    </BrowserRouter>,
  );

  expect(wrapper.find('ClickableTag').prop('link')).toContain(
    '/discover-collections?subject=maths-subject-id',
  );
});

test('Subject tag does not render as clickable when there is no subject id', () => {
  const wrapper = mount(
    <BrowserRouter>
      <SubjectTag subjectName={'Maths'} />
    </BrowserRouter>,
  );

  expect(wrapper.find('ClickableTag')).not.toExist();
});
