import { Button } from 'antd';
import React from 'react';
import savedImg from '../../../../resources/images/saved.svg';

export interface Props {
  isInDefaultCollection: boolean;
  style: 'search' | 'collection';
  onAddToDefaultCollection: () => void;
  onRemoveFromDefaultCollection: () => void;
}

export default class VideoPreviewDefaultCollectionButton extends React.PureComponent<
  Props
> {
  public render() {
    return (
      <Button
        className="toggle-collection-button"
        data-qa={this.dataQa()}
        onClick={this.onClick}
        size={'large'}
      >
        {this.content()}
      </Button>
    );
  }

  private content() {
    return (
      <span>
        {this.icon()}
        {this.text()}
      </span>
    );
  }

  private dataQa() {
    if (this.props.isInDefaultCollection) {
      return 'remove-from-default-collection';
    } else {
      return 'add-to-default-collection';
    }
  }

  private text() {
    if (!this.props.isInDefaultCollection) {
      return 'Save';
    }

    switch (this.props.style) {
      case 'search':
        return 'Saved';
      default:
        return 'Remove';
    }
  }

  private icon() {
    if (this.props.isInDefaultCollection && this.props.style === 'search') {
      return <img src={savedImg} alt="" />;
    }
    return null;
  }

  private onClick = () => {
    if (this.props.isInDefaultCollection) {
      this.props.onRemoveFromDefaultCollection();
    } else {
      this.props.onAddToDefaultCollection();
    }
  };
}
