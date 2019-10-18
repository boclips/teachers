import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import { VideoCollection } from '../../../types/VideoCollection';
import { noOp } from '../../../utils';
import CollectionHeader from '../header/CollectionHeader';
import { CollectionCardForRouter, Props } from './CollectionCard';
import CollectionCardVideoPreviews from './CollectionCardVideoPreviews';

const NUMBER_OF_PREVIEWS = 4;

describe('CollectionCard', () => {
  let collection: VideoCollection;

  const getWrapper = (extraProps: Partial<Props> = {}) => {
    const props = {
      collection,
      history: {
        push: noOp,
      } as any,
      numberOfPreviews: NUMBER_OF_PREVIEWS,
      navigateToCollectionDetails: jest.fn,
      ...extraProps,
    } as any;
    return shallow(<CollectionCardForRouter {...props} />);
  };

  beforeEach(() => {
    collection = VideoCollectionFactory.sample({
      id: '1-2-3',
      title: 'a collection',
      updatedAt: '2018-12-25T12:00:00.870Z',
      videos: VideoCollectionFactory.sampleVideos([
        VideoFactory.sample({ id: '1' }),
        VideoFactory.sample({ id: '2' }),
      ]),
      links: VideoCollectionLinksFactory.sample({
        remove: new Link({ href: 'it-exists', templated: false }),
      }),
    });
  });

  test('renders collection header', () => {
    expect(
      getWrapper()
        .find(CollectionHeader)
        .props().collection,
    ).toEqual(collection);
  });

  test('does not have class clickable without an navigateToCollectionDetails', () => {
    expect(getWrapper().find('.clickable')).toHaveLength(0);
  });

  test('renders collection video previews', () => {
    expect(getWrapper().find(CollectionCardVideoPreviews)).toExist();
  });

  describe('clicking on the card', () => {
    it('opens in the current page', () => {
      const pushSpy = jest.fn();
      const wrapper = getWrapper({
        history: {
          push: pushSpy,
        } as any,
      });

      wrapper.simulate('click', {});

      expect(pushSpy).toHaveBeenCalledWith('/collections/1-2-3');
    });

    it('opens in a new window when control held', () => {
      const pushSpy = jest.fn();
      const wrapper = getWrapper({
        history: {
          push: pushSpy,
        } as any,
      });

      wrapper.simulate('click', { ctrlKey: true });

      expect(window.open).toHaveBeenCalledWith('/collections/1-2-3');
    });

    it('opens in a new window when meta key held', () => {
      const pushSpy = jest.fn();
      const wrapper = getWrapper({
        history: {
          push: pushSpy,
        } as any,
      });

      wrapper.simulate('click', { metaKey: true });

      expect(window.open).toHaveBeenCalledWith('/collections/1-2-3');
    });
  });
});
