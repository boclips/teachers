import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { AttachmentFactory } from 'test-support/factories';
import { LessonPlan } from './LessonPlan';

storiesOf('LessonPlan', module).add('A lesson plan with markdown', () => (
  <div>
    <br />
    <br />
    <LessonPlan attachment={AttachmentFactory.sample()} />
  </div>
));
