import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AttachmentFactory } from '../../../../test-support/factories';
import { LessonGuide } from './LessonGuide';

storiesOf('LessonGuide', module).add('A lesson guide with markdown', () => (
  <div>
    <br />
    <br />
    <LessonGuide attachment={AttachmentFactory.sample()} />
  </div>
));
