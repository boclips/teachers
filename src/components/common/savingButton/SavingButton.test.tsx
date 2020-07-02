import { Button } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import SavingButton from './SavingButton';

test('renders button with props', () => {
  const onclick = () => {};
  const wrapper = mount(
    <SavingButton data-qa="sometin" onClick={onclick} saving={false} />,
  );

  expect(wrapper.find(Button)).toHaveProp('data-qa', 'sometin');
  expect(wrapper.find(Button)).toHaveProp('onClick', onclick);
  expect(wrapper.find('.saving-button__tick-container')).not.toHaveClassName(
    'saving',
  );
  expect(wrapper.find('.saving-button__tick-container')).not.toHaveClassName(
    'saved',
  );
});

describe('when saving', () => {
  test('renders button saving class', () => {
    const onclick = () => {};
    const wrapper = mount(
      <SavingButton data-qa="sometin" onClick={onclick} saving={true} />,
    );

    expect(wrapper.find('.saving-button__tick-container')).toHaveClassName(
      'saving',
    );
    expect(wrapper.find('.saving-button__tick-container')).not.toHaveClassName(
      'saved',
    );
  });

  describe('when saved', () => {
    test('renders button saving class', () => {
      const onclick = () => {};
      const wrapper = mount(
        <SavingButton data-qa="sometin" onClick={onclick} saving={true} />,
      );

      wrapper.setProps({ saving: false });
      wrapper.update();

      expect(
        wrapper.find('.saving-button__tick-container'),
      ).not.toHaveClassName('saving');
      expect(wrapper.find('.saving-button__tick-container')).toHaveClassName(
        'saved',
      );
    });
  });
});
