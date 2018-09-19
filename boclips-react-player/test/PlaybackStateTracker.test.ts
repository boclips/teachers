import axiosMock from 'axios';
import { SyntheticEvent } from 'react';
import PlaybackStateTracker from '../src/PlaybackStateTracker';

const onSegmentWatched = jest.fn();

describe('when no tracking url', () => {
  test('it generates a playback event when video gets paused', () => {
    trackPlayAndPause({ onSegmentWatched });

    expect(onSegmentWatched).toHaveBeenCalled();
    const event = onSegmentWatched.mock.calls[0][0];
    expect(event.playerIdentifier).not.toHaveLength(0);
    expect(event.captureTime).toBeInstanceOf(Date);
    expect(event.segmentStartSeconds).toBe(2);
    expect(event.segmentEndSeconds).toBe(10);
    expect(event.videoDurationSeconds).toBe(57);
  });

  test('it does not publish events', () => {
    trackPlayAndPause({ onSegmentWatched });

    expect(axiosMock.post).not.toHaveBeenCalled();
  });
});

describe('when tracking url', () => {
  test('it publishes playback event', () => {
    const trackingEndpoint = 'http://camelpun.cz';

    trackPlayAndPause({ onSegmentWatched, trackingEndpoint });

    const requestUrl = axiosMock.post.mock.calls[0][0];
    const requestBody = axiosMock.post.mock.calls[0][1];
    expect(requestUrl).toEqual(trackingEndpoint);
    expect(requestBody.playerIdentifier).not.toHaveLength(0);
    expect(requestBody.captureTime).toBeInstanceOf(Date);
    expect(requestBody.segmentStartSeconds).toBe(2);
    expect(requestBody.segmentEndSeconds).toBe(10);
    expect(requestBody.videoDurationSeconds).toBe(57);
  });
});

function trackPlayAndPause(trackerConfig) {
  const tracker = new PlaybackStateTracker(trackerConfig);

  const playEvent: SyntheticEvent<HTMLVideoElement> = {
    currentTarget: { currentTime: 2, duration: 57 },
  };
  tracker.events.onPlay(playEvent);

  const pauseEvent: SyntheticEvent<HTMLVideoElement> = {
    currentTarget: { currentTime: 10, duration: 57 },
  };
  tracker.events.onPause(pauseEvent);
}
