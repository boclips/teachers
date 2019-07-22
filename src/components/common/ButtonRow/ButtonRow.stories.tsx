import { storiesOf } from '@storybook/react';
import { Button, Icon } from 'antd';
import React from 'react';
import '../../../index.less';
import { ButtonRow } from './ButtonRow';
import ShareSVG from '../../../../resources/images/share.svg';
import DownloadSVG from '../../../../resources/images/download-transcript.svg';
const NullButton = () => null;

storiesOf('ButtonRow', module)
  .add('A single button', () => (
    <ButtonRow>
      <Button>Hello World</Button>
    </ButtonRow>
  ))
  .add('Two buttons', () => (
    <ButtonRow>
      <Button>Hello World</Button>
      <NullButton />
      <Button>Hello World</Button>
    </ButtonRow>
  ))
  .add('Four buttons, two overflowAt', () => (
    <ButtonRow overflowAt={2}>
      <Button>
        <Icon component={ShareSVG} />
        <span>One</span>
      </Button>
      <Button>
        <Icon component={DownloadSVG} />
        <span>Two</span>
      </Button>
      <Button>
        <Icon component={ShareSVG} />
        <span>Three</span>
      </Button>
      <Button>
        <Icon component={DownloadSVG} />
        <span>Four</span>
      </Button>
    </ButtonRow>
  ));
