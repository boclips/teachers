import { Rate } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { By } from '../../../../test-support/By';
import {
  MockStoreFactory,
  VideoFactory,
} from '../../../../test-support/factories';
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
  const rating = mountRating(VideoFactory.sample({ rating: 3 }));

  test('it renders a readonly rating component', () => {
    expect(rating.find(Rate).prop('defaultValue')).toEqual(3);
    expect(rating.find(Rate).prop('disabled')).toEqual(true);
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
