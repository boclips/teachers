import React from "react";
import { Video } from "../Video";
import DateFormatter from "./DateFormatter";
import DurationFormatter from "./DurationFormatter";
import { BoclipsPlayer } from "../../../../boclips-react-player";
import { Icon } from "antd";

interface Props {
  video: Video;
}

export default class VideoPreview extends React.PureComponent<Props>{

  public render() {
    return <section className="video-content">
      <section className={"video-thumbnail"}>
        <BoclipsPlayer
          thumbnail={this.props.video.thumbnailUrl}
          stream={this.props.video.streamUrl}
        />
      </section>
      <section className="video-details">
        <section className={"video-header"}>
          <h3 className="title" data-qa="video-title">
            {this.props.video.title}
          </h3>
          <p
            data-qa="video-duration"
            className={"subtitle duration"}
          >
            <Icon type="clock-circle" />{" "}
            <DurationFormatter duration={this.props.video.duration} />
          </p>
        </section>
        <p className={"subtitle"}>
          Released on{" "}
          <span data-qa="video-released-on">
                    <DateFormatter date={this.props.video.releasedOn} />
                  </span>{" "}
          by{" "}
          <span data-qa="video-content-provider">
                    {this.props.video.contentProvider}
                  </span>
        </p>
        <p data-qa="video-description" className="description">
          {this.props.video.description}
        </p>
      </section>
    </section>;
  }
}
