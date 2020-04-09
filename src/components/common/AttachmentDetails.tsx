import React from 'react';
import { Attachment } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import ReactMarkdown from 'react-markdown';
import './AttachmentDetails.less';
import { Link } from 'react-router-dom';
import LessonClip from '../../../resources/images/activity-action.svg';

export interface Props {
  resource: Attachment;
  onClick: () => {};
}

export const AttachmentDetails = (props: Props) => (
  <section>
    <section className="attachment-details">
      <h1 className="attachment-details__header">Suggested activity</h1>
      <ReactMarkdown className="attachment-details__description">
        {props.resource.description}
      </ReactMarkdown>
      <Link
        to="#"
        href={props.resource.linkToResource}
        target="_blank"
        onClick={props.onClick}
      >
        <div className="attachment-details__link">
          <LessonClip aria-hidden={true} />
          Visit activity doc
        </div>
      </Link>
    </section>
  </section>
);
