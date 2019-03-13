import { Button, Modal } from 'antd';
import React, { SyntheticEvent } from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import CollectionEditForm from './CollectionEditForm';

interface Props {
  collection: VideoCollection;
  onUpdate: (videoCollection: VideoCollection) => void;
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

  private hasFieldsChanged = values =>
    values.title !== this.props.collection.title ||
    values.isPublic !== this.props.collection.isPublic;

  public handleOk = (e: SyntheticEvent) => {
    console.log(e);
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      form.resetFields();

      if (this.hasFieldsChanged(values)) {
        this.props.onUpdate({
          ...this.props.collection,
          title: values.title,
          isPublic: values.isPublic,
        });
      }

      this.setState({ visible: false });
    });
  };

  public handleCancel = (e: SyntheticEvent) => {
    console.log(e);
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
          onClick={this.showModal}
          data-qa="collection-edit-button"
        >
          Edit Collection
        </Button>
        <Modal
          title="Edit Collection"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <CollectionEditForm
            title={this.props.collection.title}
            isPublic={this.props.collection.isPublic}
            wrappedComponentRef={this.saveFormRef}
          />
        </Modal>
      </React.Fragment>
    );
  }
}
