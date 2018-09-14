import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import { BoclipsPlayer } from '../..';

class PlayerDemo extends PureComponent {
  public render() {
    const streamUrl =
      'https://cdnapisec.kaltura.com/p/2394162/sp/239416200/playManifest/entryId/1_e0leuxs1/format/mpegdash/protocol/https/x36xhzz.mp4';

    const thumbnailUrl =
      'https://cfvod.kaltura.com/p/2394162/sp/239416200/thumbnail/entry_id/1_spq0ilkd/version/100021/width/560/height/395';

    return <BoclipsPlayer thumbnail={thumbnailUrl} stream={streamUrl} />;
  }
}

ReactDom.render(<PlayerDemo />, document.getElementById('root'));
