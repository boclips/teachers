import { Button } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import LessonClip from 'resources/images/lesson-clip.svg';
import AnalyticsFactory from 'src/services/analytics/AnalyticsFactory';
import { Attachment } from 'src/types/Attachment';
import { VideoCollection } from 'src/types/VideoCollection';
import './LessonPlan.less';

interface Props {
  attachment: Attachment;
  collectionId?: VideoCollection['id'];
}

export class LessonPlan extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="lesson-plan">
        <LessonClip aria-hidden={true} className="lesson-plan__clip" />
        <h1 className="lesson-plan__header">Lesson plan outline</h1>
        <ReactMarkdown className="lesson-plan__description">
          {this.props.attachment.description}
        </ReactMarkdown>
        <Button
          className="lesson-plan__link"
          href={this.props.attachment.links.download.getOriginalLink()}
          target="_blank"
          onClick={this.emitLessonPlanClickEvent}
        >
          Visit plan
        </Button>
      </section>
    );
  }

  private emitLessonPlanClickEvent = () => {
    AnalyticsFactory.externalAnalytics().trackCollectionAttachmentLinkVisited(
      this.props.collectionId,
      this.props.attachment,
    );
  };
}
