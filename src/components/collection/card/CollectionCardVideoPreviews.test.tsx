import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import { VideoFactory } from '../../../../test-support/factories';
import { setWidth } from '../../../../test-support/setWidth';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';
import CollectionCardVideoPreview from './preview/CollectionCardVideoPreview';
import CollectionCardVideoPreviewCount from './preview/CollectionCardVideoPreviewCount';
import EmptyCollectionCardVideoPreview from './preview/EmptyCollectionVideoCardPreview';
describe('when number of videos is less than the number of previews', () => {
  const wrapper = shallow(
    <CollectionCardVideoPreviews
      isGrid={true}
      id="1"
      numberOfPreviews={2}
      videos={[VideoFactory.sample({ id: '1' })]}
    />,
  );

  test('does not render a video preview counter with less videos than number of previews', () => {
    expect(
      wrapper.dive().find(By.dataQa('collection-video-preview-counter')),
    ).not.toExist();
  });

  test('renders video previews', () => {
    expect(wrapper.dive().find(CollectionCardVideoPreview)).toHaveLength(1);
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
    expect(wrapper.dive().find(CollectionCardVideoPreview)).toHaveLength(1);
  });

  test('renders video preview counter', () => {
    expect(
      wrapper
        .dive()
        .find(CollectionCardVideoPreviewCount)
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
    expect(wrapper.dive().find(CollectionCardVideoPreview)).toHaveLength(2);
  });

  test('does not render a video preview counter', () => {
    expect(
      wrapper.dive().find(By.dataQa('collection-video-preview-counter')),
    ).not.toExist();
  });
});

describe('below the screen-md breakpoint', () => {
  const wrapper = shallow(
    <CollectionCardVideoPreviews
      isGrid={true}
      id="1"
      numberOfPreviews={4}
      videos={[VideoFactory.sample({ id: '1' })]}
    />,
  );
  test('it displays only half the number of blank previews if the collection has less than half the max number of previews', () => {
    setWidth(500);

    expect(wrapper.dive().find(CollectionCardVideoPreview)).toHaveLength(1);
    expect(wrapper.dive().find(EmptyCollectionCardVideoPreview)).toHaveLength(
      1,
    );
  });
});
