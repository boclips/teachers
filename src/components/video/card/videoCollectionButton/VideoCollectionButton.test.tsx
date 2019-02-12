import { mount } from 'enzyme';
import React from 'react';
import VideoCollectionButton, { Props } from './VideoCollectionButton';

function render(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    isInDefaultCollection: false,
    style: 'collection',
    onAddToDefaultCollection: jest.fn(),
    onRemoveFromDefaultCollection: jest.fn(),
  };

  return mount(<VideoCollectionButton {...defaultProps} {...props} />);
}

it('Says `Save` without icon when video not in collection', () => {
  const wrapper = render({ isInDefaultCollection: false, style: 'search' });

  expect(wrapper).toHaveText('Save');
  expect(wrapper.find('img')).not.toExist();
});

it('Says `Remove` without icon when video is in collection', () => {
  const wrapper = render({ style: 'collection' });

  expect(wrapper).toHaveText('Remove');
});

it('Says `Saved` with icon when video is in collection and style is search', () => {
  const wrapper = render({ isInDefaultCollection: true, style: 'search' });

  expect(wrapper).toHaveText('Saved');
  expect(wrapper.find('img')).toExist();
});
