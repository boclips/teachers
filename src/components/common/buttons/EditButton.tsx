import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import React from 'react';
import EditSVG from '../../../../resources/images/edit-collection.svg';
import './EditButton.less';

interface CustomProps {
  'data-qa': string;
}
export default class EditButton extends React.PureComponent<
  ButtonProps & CustomProps
> {
  public render() {
    return (
      <Button
        {...this.props}
        size={'large'}
        className={'boclips__edit-button'}
        data-qa={this.props['data-qa']}
      >
        <Icon theme="filled" aria-label="Edit" component={EditSVG} />
        Edit
      </Button>
    );
  }
}
