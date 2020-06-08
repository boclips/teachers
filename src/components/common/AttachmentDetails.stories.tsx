import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AttachmentDetails } from 'src/components/common/AttachmentDetails';
import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';
import { noOp } from 'src/utils';
import { storyWithRouter } from 'src/utils/index.stories';
import { getAttachmentLabels } from 'src/components/common/AttachmentConstants';

storiesOf('AttachmentDetails', module)
  .addDecorator(storyWithRouter())
  .add('An activity attachment', () => (
    <div>
      <br />
      <br />
      <AttachmentDetails
        onClick={noOp}
        link={'http://www.google.com'}
        description="my resource description"
        labels={getAttachmentLabels(AttachmentType.ACTIVITY)}
      />
    </div>
  ))
  .add('A lesson plan attachment', () => (
    <div>
      <br />
      <br />
      <AttachmentDetails
        link={'http://www.google.com'}
        onClick={noOp}
        description="my resource description"
        labels={getAttachmentLabels(AttachmentType.LESSON_PLAN)}
      />
    </div>
  ));
