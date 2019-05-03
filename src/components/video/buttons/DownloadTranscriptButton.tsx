import { Button } from 'antd';
import axios from 'axios';
import React from 'react';
import { Video } from '../../../types/Video';

interface OwnProps {
  video: Video;
}

export default class DownloadTranscriptButton extends React.PureComponent<
  OwnProps
> {
  public render() {
    return (
      (this.props.video.links.transcript && (
        <Button
          size={'large'}
          onClick={this.handleTranscriptClick}
          data-qa="download-transcript"
        >
          Download transcript
        </Button>
      )) ||
      null
    );
  }

  private handleTranscriptClick = () => {
    const uri = this.props.video.links.transcript;
    axios.get(uri.getOriginalLink()).then(response => {
      const disposition: string = response.headers['Content-Disposition'];
      const regex = /filename="(.*?)"/;
      const matches = regex.exec(disposition);
      const filename =
        (matches && matches.length > 1 && matches[1]) || this.props.video.title;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };
}
