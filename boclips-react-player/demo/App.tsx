import React from 'react';
import ReactDom from 'react-dom';
import { PlaybackDemo } from './PlaybackDemo';
import { PlayerDemo } from './PlayerDemo';

ReactDom.render(<PlaybackDemo />, document.getElementById('video-1'));

ReactDom.render(<PlayerDemo />, document.getElementById('video-2'));
