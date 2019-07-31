import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import MoreSVG from '../../../../resources/images/more.svg';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../../components/common/higerOrderComponents/withMediaBreakPoint';
import MediaBreakpoints from '../../../types/MediaBreakpoints';
import State from '../../../types/State';
import { VideoCollection } from '../../../types/VideoCollection';
import {
  editCollectionAction,
  EditCollectionRequest,
} from '../redux/actions/editCollectionAction';
import './CollectionButtonsContainer.less';
import EditCollectionButton from './EditCollectionButton';
import RemoveCollectionButton from './RemoveCollectionButton';

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
        <EditCollectionButton
          onUpdate={this.props.patchCollection}
          collection={this.props.collection}
          canSave={this.props.canSave}
        />
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
        <EditCollectionButton
          classNameModifier="collection-edit__button--dropdown-padding"
          onUpdate={this.props.patchCollection}
          collection={this.props.collection}
          canSave={this.props.canSave}
        />
      </Menu.Item>
      <Menu.Item>
        <RemoveCollectionButton
          classNameModifier="collection-edit__button--dropdown-padding"
          collection={this.props.collection}
        />
      </Menu.Item>
    </Menu>
  );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    patchCollection: (request: EditCollectionRequest) => {
      dispatch(editCollectionAction(request));
    },
  };
};

function mapStateToProps({ collections }: State): StateProps {
  return {
    canSave: !(collections.updating || collections.loading),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withMediaBreakPoint(CollectionButtonsContainer));
