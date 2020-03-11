import React from 'react';
import { SubjectFactory, VideoFactory } from 'test-support/factories';
import { Video } from 'src/types/Video';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import VideoCardTagList from './VideoCardTagList';
describe(`VideoCardTagList`, () => {
  const getWrapper = (givenProps: Partial<{ video: Video }> = {}) => {
    const props = {
      video: VideoFactory.sample(),
      ...givenProps,
    };
    return renderWithBoclipsStore(<VideoCardTagList {...props} />, {
      authentication: { status: 'authenticated' },
    });
  };

  test('renders subject tags if there are some on the video', async () => {
    const wrapper = getWrapper({
      video: VideoFactory.sample({
        subjects: [
          SubjectFactory.sample({ id: 'maths-subject-id', name: 'Maths' }),
        ],
      }),
    });

    expect(await wrapper.findByText('Maths')).toBeInTheDocument();
  });

  test('renders best for tags if there are some on the video', async () => {
    const wrapper = getWrapper({
      video: VideoFactory.sample({ bestFor: 'Hook' }),
    });

    expect(await wrapper.findByText('Hook')).toBeInTheDocument();
  });

  test('does not render tags if unauthenticated', async () => {
    const wrapper = renderWithBoclipsStore(
      <VideoCardTagList video={VideoFactory.sample({ bestFor: 'Hook' })} />,
      {
        authentication: { status: 'anonymous' },
      },
    );

    expect(await wrapper.queryByText('Hook')).toBeNull();
  });
});
