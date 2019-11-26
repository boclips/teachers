import { storiesOf } from '@storybook/react';
import React from 'react';
import { ButtonMenu } from './ButtonMenu';

import { ButtonRow } from './ButtonRow';
import { Button, Icon } from 'antd';
import BookmarkEmptySVG from '../../../../resources/images/bookmarked.svg';
import BookmarkFilledSVG from '../../../../resources/images/unbookmarked.svg';
import ShareSVG from '../../../../resources/images/share.svg';

storiesOf('Buttons', module)
  .add('Button Row', () => {
    const buttons: React.ReactElement[] = [
      <Button>
        <Icon component={ShareSVG} />
        First
      </Button>,
      <Button>
        <Icon component={BookmarkFilledSVG} />
        Second
      </Button>,
      <Button>
        <Icon component={BookmarkEmptySVG} />
        Third
      </Button>,
    ];

    return <ButtonRow buttons={buttons} />;
  })
  .add('ButtonMenu - one button', () => {
    const buttons = [
      <Button>
        <Icon component={ShareSVG} />
        Mobile First
      </Button>,
    ];
    return <ButtonMenu buttons={buttons} />;
  })
  .add('ButtonMenu - several buttons', () => {
    const buttons = [
      <Button>
        <Icon component={ShareSVG} />
        Mobile First
      </Button>,
      <Button>
        <Icon component={BookmarkFilledSVG} />
        Mobile Second
      </Button>,
      <Button>
        <Icon component={BookmarkEmptySVG} />
        Mobile Third
      </Button>,
    ];
    return <ButtonMenu buttons={buttons} />;
  });
