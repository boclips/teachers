import { Props } from 'boclips-player-react';
import React from 'react';
import { PlayerFactory } from './boclips-player';

// jest.mock('boclips-player');

// noinspection JSUnusedGlobalSymbols
export class Player extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.playerRef(PlayerFactory.get());
  }

  public render() {
    return <div>Hello</div>;
  }
}
