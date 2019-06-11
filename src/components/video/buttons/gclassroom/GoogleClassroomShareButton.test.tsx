import { shallow } from 'enzyme';
import React from 'react';
import { VideoFactory } from '../../../../../test-support/factories';
import { GoogleClassroomShareButton } from './GoogleClassroomShareButton';

jest.mock('./GoogleClassroomShareWrapper', () => {
  return {
    gapi: Promise.resolve({
      sharetoclassroom: {
        render: jest.fn(),
      },
    }),
  };
});

describe('GoogleClassroomShareButton', () => {
  it('renders a google class room share button', () => {
    const wrapper = shallow(
      <GoogleClassroomShareButton video={VideoFactory.sample()} />,
    );

    expect(wrapper.find('[data-qa="gc-share-button"]')).toHaveLength(1);
  });
});
