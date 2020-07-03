import React from 'react';
import ReactMarkdown from 'react-markdown';
import './AttachmentDetails.less';
import { AttachmentLabels } from 'src/components/common/AttachmentConstants';
import LessonClip from '../../../resources/images/activity-action.svg';
import { InteractionTracker } from './InteractionTracker';

export interface Props {
  description: string;
  link: string;
  onClick: () => void;
  labels: AttachmentLabels;
}

export const AttachmentDetails = (props: Props) => (
  <section>
    <div className="attachment-details">
      <h1 className="attachment-details__header">{props.labels.title}</h1>
      <ReactMarkdown className="attachment-details__description">
        {props.description}
      </ReactMarkdown>
      <InteractionTracker onInteraction={props.onClick}>
        <a href={props.link} target="_blank" rel="noreferrer">
          <div className="attachment-details__link">
            <LessonClip aria-hidden />
            {props.labels.linkLabel}
          </div>
        </a>
      </InteractionTracker>
    </div>
  </section>
);
