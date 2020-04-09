import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AttachmentDetails } from 'src/components/common/AttachmentDetails';
import { AttachmentType } from 'boclips-api-client/dist/sub-clients/common/model/Attachment';

storiesOf('AttachmentDetails', module).add('A video activity', () => (
  <div>
    <br />
    <br />
    <AttachmentDetails
      resource={{
        description: 'my resource description',
        linkToResource: 'www.boclips.com',
        type: AttachmentType.ACTIVITY,
      }}
    />
  </div>
));
