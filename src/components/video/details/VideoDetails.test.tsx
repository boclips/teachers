import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import { AgeRange } from '@bit/boclips.types.age-range';
import { By } from '../../../../test-support/By';
import {
  MockStoreFactory,
  SubjectFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import { Link } from '../../../types/Link';
import VideoDetails from './VideoDetails';

describe('The Buttons on the page', () => {
  it('Has a download transcript button on the page when the video has transcripts', () => {
    const video = VideoFactory.sample({
      links: {
        self: new Link({ href: '/v1/videos/123' }),
        transcript: new Link({ href: '/v1/videos/123/transcript' }),
      },
    });
    const store = MockStoreFactory.sample();

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={createMemoryHistory()}>
          <VideoDetails video={video} />
        </ConnectedRouter>
      </Provider>,
    );

    const link = wrapper.find(By.dataQa('download-transcript')).first();
    expect(link).toExist();
  });

  it('Does not have a download transcript button on the page when the video has no transcripts', () => {
    const video = VideoFactory.sample();
    const store = MockStoreFactory.sample();

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={createMemoryHistory()}>
          <VideoDetails video={video} />
        </ConnectedRouter>
      </Provider>,
    );

    expect(wrapper.find(By.dataQa('download-transcript'))).not.toExist();
  });

  it(`renders all of a videos subject, best for, and age range tags`, () => {
    const video = VideoFactory.sample({
      subjects: [
        SubjectFactory.sample({ name: 'subject-one' }),
        SubjectFactory.sample({ name: 'subject-two' }),
      ],
      ageRange: new AgeRange(3, 10),
      bestFor: 'opener',
    });

    const initialState = MockStoreFactory.sampleState({
      subjects: video.subjects,
    });

    const wrapper = renderWithBoclipsStore(
      <VideoDetails video={video} />,
      initialState,
      createMemoryHistory(),
    );

    expect(wrapper.getByText('subject-one')).toBeInTheDocument();
    expect(wrapper.getByText('subject-two')).toBeInTheDocument();
    expect(wrapper.getByText('opener')).toBeInTheDocument();
    expect(wrapper.getByText('3-10')).toBeInTheDocument();
  });
});
