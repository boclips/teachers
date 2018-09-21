import axiosMock from 'axios';
import { SyntheticEvent } from 'react';
import PlaybackStateTracker from '../src/PlaybackStateTracker';
import Mock = jest.Mock;
import TrackerConfig from "../src/TrackerConfig";

const onSegmentWatched = jest.fn();

describe('when no tracking url', () => {
  test('it generates a playback event when video gets paused', () => {
    trackPlayAndPause({ onSegmentWatched });

    expect(onSegmentWatched).toHaveBeenCalled();
    const event = onSegmentWatched.mock.calls[0][0];
    expect(event.playerId).not.toHaveLength(0);
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

    const trackerConfig: TrackerConfig = {
      trackingEndpoint,
      eventExtraData: {
        sessionId: 'session-1',
      }
    };

    trackPlayAndPause(trackerConfig);

    const axiosPost = axiosMock.post as Mock;
    const requestUrl = axiosPost.mock.calls[0][0];
    const requestBody = axiosPost.mock.calls[0][1];
    expect(requestUrl).toEqual(trackingEndpoint);
    expect(requestBody.playerId).not.toHaveLength(0);
    expect(requestBody.captureTime).toBeInstanceOf(Date);
    expect(requestBody.segmentStartSeconds).toBe(2);
    expect(requestBody.segmentEndSeconds).toBe(10);
    expect(requestBody.videoDurationSeconds).toBe(57);
    expect(requestBody.sessionId).toBe('session-1');
  });
});

function trackPlayAndPause(trackerConfig) {
  const tracker = new PlaybackStateTracker(trackerConfig);

  const playEvent = {
    currentTarget: { currentTime: 2, duration: 57 },
  };
  tracker.events.onPlay(playEvent as SyntheticEvent<HTMLVideoElement>);

  const pauseEvent = {
    currentTarget: { currentTime: 10, duration: 57 },
  };
  tracker.events.onPause(pauseEvent as SyntheticEvent<HTMLVideoElement>);
}
