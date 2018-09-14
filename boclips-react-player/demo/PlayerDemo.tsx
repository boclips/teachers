import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import { BoclipsPlayer } from '../index';

const streamUrl =
  'https://cdnapisec.kaltura.com/p/2394162/sp/239416200/playManifest/entryId/1_e0leuxs1/format/mpegdash/protocol/https/x36xhzz.mp4';

const thumbnailUrl =
  'https://cfvod.kaltura.com/p/2394162/sp/239416200/thumbnail/entry_id/1_spq0ilkd/version/100021/width/560/height/395';

class PlayerWithThumbnailsDemo extends PureComponent {
  public render() {
    return <BoclipsPlayer thumbnail={thumbnailUrl} stream={streamUrl} />;
  }
}

ReactDom.render(
  <PlayerWithThumbnailsDemo />,
  document.getElementById('video-1'),
);

class PlayerWithoutThumbnails extends PureComponent {
  public render() {
    return <BoclipsPlayer stream={streamUrl} />;
  }
}

ReactDom.render(
  <PlayerWithoutThumbnails />,
  document.getElementById('video-2'),
);
