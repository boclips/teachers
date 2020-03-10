import { Button } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import LessonClip from '../../../../resources/images/lesson-clip.svg';
import AnalyticsFactory from '../../../services/analytics/AnalyticsFactory';
import { Attachment } from '../../../types/Attachment';
import { VideoCollection } from '../../../types/VideoCollection';
import './LessonGuide.less';

interface Props {
  attachment: Attachment;
  collection?: VideoCollection;
}

export class LessonGuide extends React.PureComponent<Props> {
  public render() {
    return (
      <section className="lesson-guide">
        <LessonClip aria-hidden={true} className="lesson-guide__clip" />
        <h1 className="lesson-guide__header">Lesson guide outline</h1>
        <ReactMarkdown className="lesson-guide__description">
          {this.props.attachment.description}
        </ReactMarkdown>
        <Button
          className="lesson-guide__link"
          href={this.props.attachment.links.download.getOriginalLink()}
          target="_blank"
          onClick={this.emitLessonGuideClickEvent}
        >
          Visit guide
        </Button>
      </section>
    );
  }

  private emitLessonGuideClickEvent = () => {
    AnalyticsFactory.externalAnalytics().trackCollectionAttachmentLinkVisited(
      this.props.collection.id,
      this.props.attachment,
    );

    AnalyticsFactory.internalAnalytics().trackCollectionInteractedWith(
      this.props.collection,
      'VISIT_LESSON_GUIDE',
    );
  };
}
