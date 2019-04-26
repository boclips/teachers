import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import { VideoFactory } from '../../../../test-support/factories';
import CollectionCardPreviewCount from './CollectionCardPreviewCount';
import CollectionCardVideoPreview from './CollectionCardVideoPreview';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';
describe('when number of videos is less than the number of previews', () => {
  const wrapper = shallow(
    <CollectionCardVideoPreviews
      isGrid={true}
      id="1"
      numberOfPreviews={2}
      videos={[VideoFactory.sample({ id: '1' })]}
    />,
  );

  test('does not render a video preview counter with less vidoes than number of previews', () => {
    expect(
      wrapper.find(By.dataQa('collection-video-preview-counter')),
    ).not.toExist();
  });

  test('renders video previews', () => {
    expect(wrapper.find(CollectionCardVideoPreview)).toHaveLength(1);
  });
});

describe('when more videos than number of previews', () => {
  const wrapper = shallow(
    <CollectionCardVideoPreviews
      isGrid={true}
      id="1"
      numberOfPreviews={2}
      videos={[
        VideoFactory.sample({ id: '1' }),
        VideoFactory.sample({ id: '2' }),
        VideoFactory.sample({ id: '3' }),
      ]}
    />,
  );

  test('renders 1 video previews', () => {
    expect(wrapper.find(CollectionCardVideoPreview)).toHaveLength(1);
  });

  test('renders video preview counter', () => {
    expect(
      wrapper
        .find(CollectionCardPreviewCount)
        .dive()
        .find(By.dataQa('collection-video-preview-counter'))
        .text(),
    ).toEqual('2');
  });
});

describe('when exactly same number of videos as number of previews', () => {
  const wrapper = shallow(
    <CollectionCardVideoPreviews
      isGrid={true}
      id="1"
      numberOfPreviews={2}
      videos={[
        VideoFactory.sample({ id: '1' }),
        VideoFactory.sample({ id: '2' }),
      ]}
    />,
  );

  test('renders 2 video previews', () => {
    expect(wrapper.find(CollectionCardVideoPreview)).toHaveLength(2);
  });

  test('does not render a video preview counter', () => {
    expect(
      wrapper.find(By.dataQa('collection-video-preview-counter')),
    ).not.toExist();
  });
});
