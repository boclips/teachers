import { Rate } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../test-support/By';
import {
  MockStoreFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { Video } from '../../../types/Video';
import Rating from './Rating';

function mountRating(video: Video) {
  return mount(
    <Provider store={MockStoreFactory.sample({})}>
      <Rating video={video} />
    </Provider>,
  );
}

describe('when video has rating', () => {
  describe('and cannot rate anymore', () => {
    const rating = mountRating(
      VideoFactory.sample({
        rating: 3,
        links: { self: new Link({ href: '' }) },
      }),
    );

    test('it renders a readonly rating component', () => {
      expect(rating.find(Rate).prop('defaultValue')).toEqual(3);
      expect(rating.find(Rate).prop('disabled')).toEqual(true);
      expect(rating.find(By.dataQa('rating-video-stars'))).not.toExist();
    });
  });

  describe('and can rate', () => {
    const rating = mountRating(VideoFactory.sample({ rating: 3 }));

    test('it renders clickable rating component', () => {
      expect(rating.find(Rate).prop('defaultValue')).toEqual(3);
      expect(rating.find(Rate).prop('disabled')).toEqual(true);
      expect(rating.find(By.dataQa('rating-video-stars'))).toExist();
    });
  });
});

describe('when video has no rating', () => {
  const rating = mountRating(VideoFactory.sample({ rating: null }));

  test('it renders a readonly rating component', () => {
    expect(rating.find(Rate)).not.toExist();
  });

  describe('when rating video', () => {
    beforeEach(() => {
      rating
        .find(By.dataQa('rating-video-button'))
        .at(0)
        .simulate('click');
    });

    test('it renders a readonly rating component', () => {
      expect(rating.find(By.dataQa('rating-description'))).toExist();
    });
  });
});
