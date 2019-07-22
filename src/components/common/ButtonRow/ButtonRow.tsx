import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import MoreSVG from '../../../../resources/images/more.svg';
import './ButtonRow.less';

interface Props {
  children: React.ReactElement | React.ReactElement[];
  overflowAt?: number;
}

export class ButtonRow extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    overflowAt: 5,
  };

  public render() {
    if (!Array.isArray(this.props.children)) {
      return <Button.Group>{this.props.children}</Button.Group>;
    }

    const buttonsToRender = this.props.children.slice(0, this.props.overflowAt);

    const buttonsForDropdown = this.props.children.slice(this.props.overflowAt);

    let dropdownContent = null;

    if (buttonsForDropdown.length) {
      dropdownContent = (
        <Dropdown
          overlayClassName="button-row__dropdown"
          overlay={
            <Menu>
              {buttonsForDropdown.map((button, index) => (
                <Menu.Item key={index}>{button}</Menu.Item>
              ))}
            </Menu>
          }
          trigger={['click']}
        >
          <Button data-qa="more-buttons">
            <Icon component={MoreSVG} />
          </Button>
        </Dropdown>
      );
    }

    return (
      <Button.Group className="button-row">
        {buttonsToRender}
        {dropdownContent}
      </Button.Group>
    );
  }
}
