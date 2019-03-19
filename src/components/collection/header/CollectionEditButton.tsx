import { Button } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import Bodal from '../../common/Bodal';
import { EditCollectionRequest } from '../redux/actions/editCollectionAction';
import CollectionEditForm, { EditableFields } from './CollectionEditForm';
import './CollectionEditForm.less';

interface Props {
  collection: VideoCollection;
  canSave: boolean;
  onUpdate: (request: EditCollectionRequest) => void;
}

interface State {
  visible: boolean;
}

export default class CollectionEditButton extends React.PureComponent<
  Props,
  State
> {
  private formRef: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  private showModal = () => {
    this.setState({
      visible: true,
    });
  };

  private hasFieldsChanged = (values: EditableFields) =>
    values.title !== this.props.collection.title ||
    values.isPublic !== this.props.collection.isPublic;

  public handleOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values: EditableFields) => {
      if (err) {
        return;
      }

      form.resetFields();

      if (this.hasFieldsChanged(values)) {
        this.props.onUpdate({
          originalCollection: this.props.collection,
          title:
            values.title !== this.props.collection.title ? values.title : null,
          isPublic:
            values.isPublic !== this.props.collection.isPublic
              ? values.isPublic
              : null,
        });
      }

      this.setState({ visible: false });
    });
  };

  public handleCancel = () => {
    this.setState({ visible: false });
  };

  private saveFormRef = formRef => {
    this.formRef = formRef;
  };

  public render() {
    return (
      <React.Fragment>
        <Button
          type="primary"
          size="large"
          onClick={this.showModal}
          data-qa="collection-edit-button"
          disabled={!this.props.canSave || this.state.visible}
        >
          Edit Collection
        </Button>
        <Bodal
          title="Edit Collection"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{
            size: 'large',
            loading: !this.props.canSave,
            disabled: !this.props.canSave,
          }}
          okText="Save"
          cancelButtonProps={{ size: 'large' }}
          closable={false}
          width={655}
        >
          <CollectionEditForm
            title={this.props.collection.title}
            isPublic={this.props.collection.isPublic}
            canSave={this.props.canSave}
            wrappedComponentRef={this.saveFormRef}
          />
        </Bodal>
      </React.Fragment>
    );
  }
}
