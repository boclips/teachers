import { Props } from 'boclips-player-react';
import React from 'react';
import { PlayerFactory } from './boclips-player';

// Noinspection JSUnusedGlobalSymbols
export class Player extends React.Component<Props> {
  public componentDidMount(): void {
    const { playerRef } = this.props;
    playerRef(PlayerFactory.get());
  }

  public render() {
    return <div>Hello</div>;
  }
}
