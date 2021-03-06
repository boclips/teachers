import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';
import Icon from '@ant-design/icons';
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
        onClick={this.props.onClick}
        size="large"
        className="boclips__edit-button"
        data-qa={this.props['data-qa']}
      >
        <Icon aria-label="Edit" component={EditSVG} />
        Edit
      </Button>
    );
  }
}
