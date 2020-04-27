import React from 'react';
import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import ReactMarkdown from 'react-markdown';
import './AttachmentDetails.less';
import LessonClip from '../../../resources/images/activity-action.svg';
import { InteractionTracker } from './InteractionTracker';

export interface Props {
  description: string;
  type: AttachmentType;
  link: string;
  onClick: () => void;
}

export const AttachmentDetails = (props: Props) => {
  let title;
  let linkLabel;
  if (props.type === AttachmentType.ACTIVITY) {
    title = 'Suggested activity';
    linkLabel = 'Visit activity doc';
  } else {
    title = 'Lesson guide outline';
    linkLabel = 'Visit lesson guide';
  }

  return (
    <section>
      <div className="attachment-details">
        <h1 className="attachment-details__header">{title}</h1>
        <ReactMarkdown className="attachment-details__description">
          {props.description}
        </ReactMarkdown>
        <InteractionTracker onInteraction={props.onClick}>
          <a href={props.link} target="_blank">
            <div className="attachment-details__link">
              <LessonClip aria-hidden={true} />
              {linkLabel}
            </div>
          </a>
        </InteractionTracker>
      </div>
    </section>
  );
};
