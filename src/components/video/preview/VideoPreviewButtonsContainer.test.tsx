import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import { VideoFactory } from '../../../../test-support/factories';
import { VideoPreviewButtonsContainer } from './VideoPreviewButtonsContainer';

const video = VideoFactory.sample();

test('shows save button when not in collection', () => {
  const videoPreview = mount(
    <VideoPreviewButtonsContainer
      video={video}
      isInCollection={false}
      onToggleInDefaultCollection={jest.fn()}
    />,
  );

  const saveButton = videoPreview
    .find(By.dataQa('default-collection-toggle'))
    .first();
  expect(saveButton).toHaveText('Save');
});

test('shows saved button when in collection', () => {
  const videoPreview = mount(
    <VideoPreviewButtonsContainer
      video={video}
      isInCollection={true}
      onToggleInDefaultCollection={jest.fn()}
    />,
  );

  const unsaveButton = videoPreview
    .find(By.dataQa('default-collection-toggle'))
    .first();

  expect(unsaveButton).toHaveText('Saved');
});

test('invokes callback when add/remove from collection button is clicked', () => {
  const onToggleInDefaultCollection: (b: boolean) => void = jest.fn();
  const videoPreview = mount(
    <VideoPreviewButtonsContainer
      video={video}
      isInCollection={true}
      onToggleInDefaultCollection={onToggleInDefaultCollection}
    />,
  );
  videoPreview
    .find(By.dataQa('default-collection-toggle'))
    .first()
    .simulate('click');

  expect(onToggleInDefaultCollection).toHaveBeenCalledWith(false);
});
