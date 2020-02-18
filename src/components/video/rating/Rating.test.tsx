import { Rate } from 'antd';
import { shallow } from 'enzyme';
import React from 'react';
import { By } from 'test-support/By';
import { VideoFactory } from 'test-support/factories';
import { Link } from 'src/types/Link';
import { Video } from 'src/types/Video';
import VideoFeedbackModal from './VideoFeedbackModal';
import Rating from './Rating';

const getShallowRating = (video: Video) => shallow(<Rating video={video} />);

describe('when video has rating', () => {
  describe('and cannot rate anymore', () => {
    const rating = getShallowRating(
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
    const rating = getShallowRating(VideoFactory.sample({ rating: 3 }));

    test('it renders clickable rating component', () => {
      const rate = rating.find(Rate).first();
      expect(rate.prop('defaultValue')).toEqual(3);
      expect(rate.prop('disabled')).toEqual(true);
      expect(rating.find(By.dataQa('rating-video-stars'))).toExist();
    });
  });
});

describe('when video has no rating', () => {
  const rating = getShallowRating(VideoFactory.sample({ rating: null }));

  test('it renders only a rating button', () => {
    expect(rating.find(Rate)).not.toExist();
    expect(rating.find(By.dataQa('rating-video-button'))).toExist();
  });

  describe(`when clicking on rating button`, () => {
    test(`it opens the feedback modal and does not follow dummy rating link`, () => {
      const preventDefaultSpy = jest.fn();
      rating.find(By.dataQa('rating-video-button')).simulate('click', {
        preventDefault: preventDefaultSpy,
      });

      expect(rating.find(VideoFeedbackModal)).toExist();
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });
});
