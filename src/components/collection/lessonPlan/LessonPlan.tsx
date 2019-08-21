import { Button } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import LessonClip from '../../../../resources/images/lesson-clip.svg';
import { Attachment } from '../../../types/Attachment';
import './LessonPlan.less';

interface Props {
  attachment: Attachment;
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
        >
          Visit plan
        </Button>
      </section>
    );
  }
}
