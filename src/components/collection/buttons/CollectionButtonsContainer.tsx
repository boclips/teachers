import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import MoreSVG from '../../../../resources/images/more.svg';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../../components/common/higerOrderComponents/withMediaBreakPoint';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import { VideoCollection } from '../../../types/VideoCollection';
import { EditCollectionRequest } from '../redux/actions/editCollectionAction';
import './CollectionButtonsContainer.less';
import { EditCollectionButton } from './EditCollectionButton';
import { RemoveCollectionButton } from './RemoveCollectionButton';

interface Props extends WithMediaBreakPointProps {
  collection: VideoCollection;
  className?: string;
}

interface StateProps {
  canSave: boolean;
}

interface DispatchProps {
  patchCollection: (request: EditCollectionRequest) => void;
}

class CollectionButtonsContainer extends React.PureComponent<
  Props & StateProps & DispatchProps
> {
  public render() {
    if (!this.props.collection.links.edit) {
      return null;
    }
    return this.props.mediaBreakpoint.width > MediaBreakpoints.md.width ? (
      <div className={this.props.className}>
        <EditCollectionButton collection={this.props.collection} />
        <RemoveCollectionButton collection={this.props.collection} />
      </div>
    ) : (
      <span className={this.props.className}>
        <Button.Group>
          <Dropdown overlay={this.menu()} trigger={['click']}>
            <Button className="collection-edit__mobile ">
              <Icon component={MoreSVG} aria-label="Modify collection" />
            </Button>
          </Dropdown>
        </Button.Group>
      </span>
    );
  }

  private menu = () => (
    <Menu className="collection-edit-dropdown">
      <Menu.Item>
        <EditCollectionButton collection={this.props.collection} />
      </Menu.Item>
      <Menu.Item>
        <RemoveCollectionButton collection={this.props.collection} />
      </Menu.Item>
    </Menu>
  );
}

export default withMediaBreakPoint(CollectionButtonsContainer);
