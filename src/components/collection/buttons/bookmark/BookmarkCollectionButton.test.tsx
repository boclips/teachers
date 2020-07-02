import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../../../test-support/By';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../../../test-support/factories';
import { Link } from '../../../../types/Link';
import { noOp } from '../../../../utils';
import { BookmarkCollectionButtonInner } from './BookmarkCollectionButton';

describe('BookmarkCollectionButton', () => {
  describe('when neither bookmark nor unbookmark link', () => {
    test('renders nothing', () => {
      const button = shallow(
        <BookmarkCollectionButtonInner
          collection={VideoCollectionFactory.sample({
            links: VideoCollectionLinksFactory.sample({
              bookmark: undefined,
              unbookmark: undefined,
            }),
          })}
          onBookmarkCollectionAction={noOp}
          onUnbookmarkCollectionAction={noOp}
        />,
      );

      expect(button.find(By.dataQa('bookmark-collection'))).not.toExist();
      expect(button.find(By.dataQa('unbookmark-collection'))).not.toExist();
    });
  });

  describe('when bookmark link', () => {
    test('renders bookmark button', () => {
      const button = shallow(
        <BookmarkCollectionButtonInner
          collection={VideoCollectionFactory.sample({
            links: VideoCollectionLinksFactory.sample({
              bookmark: new Link({ href: '' }),
              unbookmark: undefined,
            }),
          })}
          onBookmarkCollectionAction={noOp}
          onUnbookmarkCollectionAction={noOp}
        />,
      );

      expect(button.find(By.dataQa('bookmark-collection'))).toExist();
      expect(button.find(By.dataQa('unbookmark-collection'))).not.toExist();
    });
  });

  describe('when unbookmark link', () => {
    test('renders unbookmark button', () => {
      const button = shallow(
        <BookmarkCollectionButtonInner
          collection={VideoCollectionFactory.sample({
            links: VideoCollectionLinksFactory.sample({
              unbookmark: new Link({ href: '' }),
              bookmark: undefined,
            }),
          })}
          onBookmarkCollectionAction={noOp}
          onUnbookmarkCollectionAction={noOp}
        />,
      );

      expect(button.find(By.dataQa('unbookmark-collection'))).toExist();
      expect(button.find(By.dataQa('bookmark-collection'))).not.toExist();
    });
  });
});
