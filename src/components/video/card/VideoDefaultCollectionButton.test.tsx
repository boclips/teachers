import { mount } from 'enzyme';
import React from 'react';
import VideoPreviewDefaultCollectionButton, {
  Props,
} from './VideoDefaultCollectionButton';

function render(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    isInDefaultCollection: false,
    style: 'collection',
    onAddToDefaultCollection: jest.fn(),
    onRemoveFromDefaultCollection: jest.fn(),
  };

  return mount(
    <VideoPreviewDefaultCollectionButton {...defaultProps} {...props} />,
  );
}

it('Says `Save` without icon when video not in collection', () => {
  const wrapper = render({ isInDefaultCollection: false });

  expect(wrapper).toHaveText('Save');
  expect(wrapper.find('img')).not.toExist();
});

it('Says `Remove` without icon when video is in collection and style is collection', () => {
  const wrapper = render({ isInDefaultCollection: true, style: 'collection' });

  expect(wrapper).toHaveText('Remove');
});

it('Says `Saved` with icon when video is in collection and style is search', () => {
  const wrapper = render({ isInDefaultCollection: true, style: 'search' });

  expect(wrapper).toHaveText('Saved');
  expect(wrapper.find('img')).toExist();
});

it('Invokes callback when clicked while not in default collection', () => {
  const onAddToDefaultCollection = jest.fn();
  const onRemoveFromDefaultCollection = jest.fn();

  render({
    isInDefaultCollection: false,
    onAddToDefaultCollection,
    onRemoveFromDefaultCollection,
  })
    .find('Button')
    .simulate('click');

  expect(onAddToDefaultCollection).toHaveBeenCalled();
  expect(onRemoveFromDefaultCollection).not.toHaveBeenCalled();
});

it('Invokes callback when clicked while in default collection', () => {
  const onAddToDefaultCollection = jest.fn();
  const onRemoveFromDefaultCollection = jest.fn();

  render({
    isInDefaultCollection: true,
    onAddToDefaultCollection,
    onRemoveFromDefaultCollection,
  })
    .find('Button')
    .simulate('click');

  expect(onRemoveFromDefaultCollection).toHaveBeenCalled();
  expect(onAddToDefaultCollection).not.toHaveBeenCalled();
});
