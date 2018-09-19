import { SyntheticEvent } from 'react';
import PlaybackStateTracker from '../src/PlaybackStateTracker';

test('it generates a playback event when video gets paused', () => {
  const onEvent = jest.fn();

  const tracker = new PlaybackStateTracker(onEvent);

  const playEvent: SyntheticEvent<HTMLVideoElement> = {
    currentTarget: { currentTime: 2, duration: 57 },
  };
  tracker.props.onPlay(playEvent);

  const pauseEvent: SyntheticEvent<HTMLVideoElement> = {
    currentTarget: { currentTime: 10, duration: 57 },
  };
  tracker.props.onPause(pauseEvent);

  expect(onEvent).toHaveBeenCalled();
  const event = onEvent.mock.calls[0][0];

  expect(event.playerIdentifier).not.toHaveLength(0);
  expect(event.captureTime).toBeInstanceOf(Date);
  expect(event.segmentStartSeconds).toBe(2);
  expect(event.segmentEndSeconds).toBe(10);
  expect(event.videoDurationSeconds).toBe(57);
});
