import { storiesOf } from '@storybook/react';
import React from 'react';

import { Button, Icon } from 'antd';
import BookmarkEmptySVG from '../../../../resources/images/bookmarked.svg';
import BookmarkFilledSVG from '../../../../resources/images/unbookmarked.svg';
import ShareSVG from '../../../../resources/images/share.svg';
import { ButtonRow } from './ButtonRow';
import { ButtonMenu } from './ButtonMenu';

storiesOf('Buttons', module)
  .add('Button Row', () => {
    const leftButtons: React.ReactElement[] = [
      <Button>
        <Icon component={ShareSVG} />
        First
      </Button>,
    ];

    const rightButtons: React.ReactElement[] = [
      <Button>
        <Icon component={BookmarkFilledSVG} />
        Second
      </Button>,
      <Button>
        <Icon component={BookmarkEmptySVG} />
        Third
      </Button>,
    ];

    return <ButtonRow leftButtons={leftButtons} rightButtons={rightButtons} />;
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
