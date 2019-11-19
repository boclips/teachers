import { Props } from 'boclips-player-react';
import React from 'react';
import { PlayerFactory } from './boclips-player';

// Jest.mock('boclips-player');

// Noinspection JSUnusedGlobalSymbols
export class Player extends React.Component<Props> {
  public componentDidMount(): void {
    this.props.playerRef(PlayerFactory.get());
  }

  public render() {
    return <div>Hello</div>;
  }
}
