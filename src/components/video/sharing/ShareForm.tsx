import { Form } from '@ant-design/compatible';
import React from 'react';
import { Segment, Video } from '../../../types/Video';
import { RestrictiveTimePicker } from '../../common/RestrictiveTimePicker';
import './ShareForm.less';

export interface ShareFormProps {
  video: Video;
  onSegmentChange: (segment: Segment) => void;
}

interface ShareFormState {
  segment: Segment;
}

export class ShareForm extends React.Component<ShareFormProps, ShareFormState> {
  public state = {
    segment: {
      start: undefined,
      end: undefined,
    },
  };

  private handleStartChange = (segmentStart: number) => {
    this.setState(
      (prevState) => ({
        segment: { ...prevState.segment, start: segmentStart },
      }),
      () => this.props.onSegmentChange(this.state.segment),
    );
  };

  private handleEndChange = (segmentEnd: number) => {
    this.setState(
      (prevState) => ({ segment: { ...prevState.segment, end: segmentEnd } }),
      () => this.props.onSegmentChange(this.state.segment),
    );
  };

  public render() {
    const duration = this.props.video.duration;
    return (
      <Form layout="inline" className="share-form">
        <RestrictiveTimePicker
          onChange={this.handleStartChange}
          checkboxLabel="enable starting from"
          initialValue={0}
          label="starting from"
          upperBound={duration.asSeconds()}
        />
        <RestrictiveTimePicker
          checkboxLabel="enable until"
          label="until"
          upperBound={duration.asSeconds()}
          onChange={this.handleEndChange}
          initialValue={duration.asSeconds()}
        />
      </Form>
    );
  }
}
