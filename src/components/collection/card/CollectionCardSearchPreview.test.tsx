import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../../test-support/By';
import {
  VideoCollectionFactory,
  VideoFactory,
  VideoIdFactory,
} from '../../../../test-support/factories';
import { CollectionCardSearchPreview } from './CollectionCardSearchPreview';

describe('Rendering a full grid of video previews', () => {
  const videos = [
    VideoFactory.sample({
      thumbnailUrl: 'https://picsum.photos/seed/1/300/200',
    }),
    VideoFactory.sample({
      thumbnailUrl: 'https://picsum.photos/seed/2/300/200',
    }),
    VideoFactory.sample({
      thumbnailUrl: 'https://picsum.photos/seed/3/300/200',
    }),
    VideoFactory.sample({
      thumbnailUrl: 'https://picsum.photos/seed/4/300/200',
    }),
    VideoFactory.sample({
      thumbnailUrl: 'https://picsum.photos/seed/5/300/200',
    }),
    VideoFactory.sample({
      thumbnailUrl: 'https://picsum.photos/seed/6/300/200',
    }),
  ];

  const getCollection = (numberOfVideos: number) =>
    VideoCollectionFactory.sample({
      videoIds: videos
        .slice(0, numberOfVideos)
        .map(video => VideoIdFactory.sample({ value: video.id })),
    });

  it('renders a one video collection with one thumbnail with three placeholders', () => {
    const previews = mount(
      <CollectionCardSearchPreview
        collection={getCollection(1)}
        videos={videos.slice(0, 1)}
      />,
    );
    expect(previews.find(By.dataQa('thumbnail')).length).toEqual(1);
    expect(previews.find(By.dataQa('placeholder')).length).toEqual(3);
  });

  it('renders a two video collection with two thumbnails with two placeholders', () => {
    const previews = mount(
      <CollectionCardSearchPreview
        collection={getCollection(2)}
        videos={videos.slice(0, 2)}
      />,
    );
    expect(previews.find(By.dataQa('thumbnail')).length).toEqual(2);
    expect(previews.find(By.dataQa('placeholder')).length).toEqual(2);
  });

  it('renders a four video collection with four thumbnails with no placeholders', () => {
    const previews = mount(
      <CollectionCardSearchPreview
        collection={getCollection(4)}
        videos={videos.slice(0, 4)}
      />,
    );
    expect(previews.find(By.dataQa('thumbnail')).length).toEqual(4);
    expect(previews.find(By.dataQa('placeholder')).length).toEqual(0);
  });

  it('renders a five video collection with three thumbnails and one placeholder containing "+ 2 videos"', () => {
    const previews = mount(
      <CollectionCardSearchPreview
        collection={getCollection(5)}
        videos={videos.slice(0, 5)}
      />,
    );
    expect(previews.find(By.dataQa('thumbnail')).length).toEqual(3);
    const placeholders = previews.find(By.dataQa('placeholder'));
    expect(placeholders).toHaveLength(1);
    expect(placeholders.at(0).text()).toEqual('+2videos');
  });

  it('renders a six video collection with three thumbnails and one placeholder containing "+ 3 videos"', () => {
    const previews = mount(
      <CollectionCardSearchPreview
        collection={getCollection(6)}
        videos={videos.slice(0, 6)}
      />,
    );
    expect(previews.find(By.dataQa('thumbnail')).length).toEqual(3);
    const placeholders = previews.find(By.dataQa('placeholder'));
    expect(placeholders).toHaveLength(1);
    expect(placeholders.at(0).text()).toEqual('+3videos');
  });
});
