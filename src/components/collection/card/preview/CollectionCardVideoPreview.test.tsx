import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../../test-support/factories';
import { setWidth } from '../../../../../test-support/setWidth';
import CollectionCardVideoPreview from './CollectionCardVideoPreview';

describe('when below the screen-md width', () => {
  const video = VideoFactory.sample({ id: '1' });
  const wrapper = shallow(
    <CollectionCardVideoPreview video={video} isGrid={false} id={'1'} />,
  );

  test('displays video thumbnails rather than playable videos', () => {
    setWidth(500);

    expect(
      wrapper.dive().find('section.collection-card-thumbnail-container'),
    ).toExist();
  });
});

describe('when above the screen-md width', () => {
  const video = VideoFactory.sample({ id: '1' });
  const wrapper = shallow(
    <CollectionCardVideoPreview video={video} isGrid={false} id={'1'} />,
  );

  test('does not display video thumbnails', () => {
    setWidth(1000);

    expect(
      wrapper.dive().find('section.collection-card-thumbnail-container'),
    ).not.toExist();
  });
});
