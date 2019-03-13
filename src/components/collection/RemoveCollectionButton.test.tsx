import { shallow } from 'enzyme';
import React from 'react';
import {
  VideoCollectionFactory,
  VideoCollectionLinksFactory,
} from '../../../test-support/factories';
import { Link } from '../../types/Link';
import { RemoveCollectionButtonInner } from './RemoveCollectionButton';

const noOp = () => {};

describe('RemoveCollectionButton', () => {
  test('When collection cannot be removed renders nothing', () => {
    const button = shallow(
      <RemoveCollectionButtonInner
        collection={VideoCollectionFactory.sample({
          links: VideoCollectionLinksFactory.sample({ remove: undefined }),
        })}
        onDeleteCollectionAction={noOp}
      />,
    );
    expect(button).toBeEmptyRender();
  });

  test('When collection can be removed renders stuff', () => {
    const button = shallow(
      <RemoveCollectionButtonInner
        collection={VideoCollectionFactory.sample({
          links: VideoCollectionLinksFactory.sample({
            remove: new Link({ href: '' }),
          }),
        })}
        onDeleteCollectionAction={noOp}
      />,
    );
    expect(button).not.toBeEmptyRender();
  });
});
