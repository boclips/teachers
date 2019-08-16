import BoclipsSecurity from 'boclips-js-security';
import { Player, PlayerFactory } from 'boclips-player';
import { RouterActionType } from 'connected-react-router';
import { mount } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import {
  MockStoreFactory,
  RouterFactory,
  VideoFactory,
} from '../../../../test-support/factories';
import {
  ProviderComponent,
  ProviderComponentProps,
} from '../../../../test-support/ProviderComponent';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import State from '../../../types/State';
import VideoPlayer, { OwnProps } from './VideoPlayer';

jest.mock('boclips-player');
jest.unmock('boclips-player-react');
jest.requireActual('boclips-player-react');

const video = VideoFactory.sample();
const getComponent = (
  overrideProps: Partial<OwnProps> = {},
  store: Partial<State> = {},
) => {
  const props = {
    video,
    ...overrideProps,
  };

  return mount<ProviderComponentProps<OwnProps>>(
    <ProviderComponent
      store={MockStoreFactory.sample(store)}
      childComponent={VideoPlayer}
      childProps={props}
    />,
  );
};

describe('analytics data', () => {
  const testData = [
    {
      message: 'will pass videoId to Player',
      videoPlayerProps: { video },
      expectedAnalyticMetadata: {
        videoId: video.id,
      },
    },
    {
      message: 'will pass undefined videoIndex to Player',
      videoPlayerProps: { video, videoIndex: undefined },
      expectedAnalyticMetadata: {
        videoIndex: undefined,
      },
    },

    {
      message: 'will pass 0 videoIndex to Player',
      videoPlayerProps: { video, videoIndex: 0 },
      expectedAnalyticMetadata: {
        videoIndex: 0,
      },
    },
    {
      message: 'will pass 1 videoIndex to Player',
      videoPlayerProps: { video, videoIndex: 1 },
      expectedAnalyticMetadata: {
        videoIndex: 1,
      },
    },
    {
      message: 'will pass 2 videoIndex to Player',
      videoPlayerProps: { video, videoIndex: 2 },
      expectedAnalyticMetadata: {
        videoIndex: 2,
      },
    },
  ];

  testData.forEach(
    ({ message, videoPlayerProps, expectedAnalyticMetadata }) => {
      it(message, () => {
        getComponent(videoPlayerProps);

        expect(PlayerFactory.get).toHaveBeenCalled();

        const optionsPassed = mocked(PlayerFactory.get).mock.calls[0][1];
        expect(optionsPassed.analytics.metadata).toEqual(
          expect.objectContaining(expectedAnalyticMetadata),
        );
      });
    },
  );
});

describe('loading the video', () => {
  const testData = [
    {
      message: 'no segment',
      search: '',
      expectedArgs: [video.links.self.getOriginalLink()],
    },
    {
      message: 'a start segment',
      search: 'segmentStart=30',
      expectedArgs: [video.links.self.getOriginalLink(), { start: 30 }],
    },
    {
      message: 'an end segment',
      search: 'segmentEnd=30',
      expectedArgs: [video.links.self.getOriginalLink(), { end: 30 }],
    },
    {
      message: 'a whole segment',
      search: 'segmentStart=15&segmentEnd=40',
      expectedArgs: [
        video.links.self.getOriginalLink(),
        { start: 15, end: 40 },
      ],
    },
  ];

  testData.forEach(data => {
    it(`will load the video in the player with ${data.message}`, () => {
      const store = {
        router: {
          location: {
            ...RouterFactory.sample().location,
            search: data.search,
          },
          action: 'PUSH' as RouterActionType,
        },
      };

      getComponent({ video }, store);

      expect(PlayerFactory.get).toHaveBeenCalled();

      const player: Player = mocked(PlayerFactory.get).mock.results[0].value;

      expect(player.loadVideo).toHaveBeenCalledWith(...data.expectedArgs);
    });
  });
});

it('will load a different video if the video changes', () => {
  const component = getComponent();

  expect(PlayerFactory.get).toHaveBeenCalled();

  const player: Player = mocked(PlayerFactory.get).mock.results[0].value;

  expect(player.loadVideo).toHaveBeenCalledWith(
    video.links.self.getOriginalLink(),
  );

  const newVideo = VideoFactory.sample({ id: 'the-new-video' });

  component.setProps({
    childProps: {
      ...component.prop('childProps'),
      video: newVideo,
    },
  });

  expect(player.loadVideo).toBeCalledTimes(2);
  expect(player.loadVideo).toHaveBeenLastCalledWith(
    newVideo.links.self.getOriginalLink(),
  );
});

it('will not reload the same video on props change', () => {
  const constantVideo = VideoFactory.sample({
    id: 'a-constant-video',
  });

  const component = getComponent({
    video: constantVideo,
  });

  expect(PlayerFactory.get).toHaveBeenCalled();

  const player: Player = mocked(PlayerFactory.get).mock.results[0].value;

  expect(player.loadVideo).toHaveBeenCalledWith(
    constantVideo.links.self.getOriginalLink(),
  );

  component.setProps({
    childProps: {
      ...component.prop('childProps'),
      video: { ...constantVideo },
    },
  });

  expect(player.loadVideo).toHaveBeenCalledTimes(1);
});

describe('it passes a permissive token factory to the player', () => {
  let providedTokenFactory;

  beforeEach(() => {
    getComponent();

    expect(PlayerFactory.get).toHaveBeenCalled();

    const options = mocked(PlayerFactory.get).mock.calls[0][1];
    providedTokenFactory = options.api.tokenFactory;
  });

  it('returns null when an error is thrown getting a token', () => {
    mocked(BoclipsSecurity.getInstance).mockReturnValue({
      getTokenFactory: () =>
        jest.fn().mockImplementation(() => {
          throw new Error('Some error');
        }),
    } as any);

    expect(providedTokenFactory()).resolves.toEqual(null);
  });

  it('returns a token when the token is resolved', () => {
    expect(providedTokenFactory()).resolves.toEqual('test-token');
  });
});

describe('controls are specific to the context', () => {
  beforeEach(() => {
    mocked(PlayerFactory.get).mockClear();
  });

  const testData = [
    {
      message: 'mobile',
      innerWidth: MediaBreakpoints.xs.width - 1,
      mode: 'default',
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'captions',
      ],
    },
    {
      message: 'card',
      innerWidth: MediaBreakpoints.lg.width - 1,
      mode: 'card',
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'captions',
      ],
    },
    {
      message: 'desktop non-card',
      innerWidth: MediaBreakpoints.lg.width - 1,
      mode: 'default',
      controls: [
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'fullscreen',
      ],
    },
  ];

  testData.forEach(data => {
    it(`displays the correct controls when in ${data.message}`, () => {
      Object.defineProperty(window, 'innerWidth', {
        value: data.innerWidth,
      });

      window.dispatchEvent(new Event('resize'));

      getComponent({ mode: data.mode as any });

      const options = mocked(PlayerFactory.get).mock.calls[0][1];
      expect(options.interface.controls).toEqual(data.controls);
    });
  });
});
