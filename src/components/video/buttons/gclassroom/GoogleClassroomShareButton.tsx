import React from 'react';
import { Video } from '../../../../types/Video';
import { gapi, ShareToClassroom } from './GoogleClassroomShareWrapper';

interface Props {
  video: Video;
}

export class GoogleClassroomShareButton extends React.Component<Props> {
  private ref: any = React.createRef();

  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <div
          ref={this.ref}
          data-size="32"
          data-url="https://test.com/resource/1"
          data-qa="gc-share-button"
        />
      </div>
    );
  }

  public componentDidMount(): void {
    gapi.then((instance: ShareToClassroom) => {
      instance.sharetoclassroom.render(this.ref.current);
    });
  }
}
