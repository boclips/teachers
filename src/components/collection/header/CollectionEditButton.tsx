import { Button } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import Bodal from '../../common/Bodal';
import { EditCollectionRequest } from '../redux/actions/editCollectionAction';

import { AgeRange, isEqualTo } from '../../../types/AgeRange';
import './CollectionEditButton.less';
import CollectionEditForm, { EditableFields } from './CollectionEditForm';

interface Props {
  collection: VideoCollection;
  canSave: boolean;
  onUpdate: (request: EditCollectionRequest) => void;
}

interface State {
  visible: boolean;
  hasAgeRangeBeenTouched: boolean;
  ageRange: AgeRange;
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
      hasAgeRangeBeenTouched: false,
      ageRange: this.props.collection.ageRange
        ? this.props.collection.ageRange
        : new AgeRange(),
    };
  }

  private onAgeRangeChange = (ageRange: number[]) => {
    this.formRef.props.form.setFieldsValue({
      ageRange,
    });

    this.setState({ hasAgeRangeBeenTouched: true });
  };

  public handleOk = () => {
    const form = this.formRef.props.form;
    form.validateFields((formErrors, values: EditableFields) => {
      if (formErrors) {
        return;
      }

      const collectionChanges = {
        originalCollection: this.props.collection,
        title:
          values.title !== this.props.collection.title ? values.title : null,
        isPublic:
          values.isPublic !== this.props.collection.isPublic
            ? values.isPublic
            : null,
        subjects:
          values.subjects !== this.props.collection.subjects
            ? values.subjects
            : null,
        ageRange: this.hasAgeRangeChanged(values.ageRange)
          ? values.ageRange
          : new AgeRange(),
      };

      form.resetFields();

      if (
        this.hasFieldsChanged(values) ||
        this.hasAgeRangeChanged(values.ageRange)
      ) {
        this.props.onUpdate(collectionChanges);
      }

      this.setState({ visible: false });
    });
  };

  public handleCancel = () => {
    this.setState({ visible: false });
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
          title="Edit collection"
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
          wrapClassName="generic-modal edit-collection-modal"
        >
          <CollectionEditForm
            title={this.props.collection.title}
            isPublic={this.props.collection.isPublic}
            subjects={this.props.collection.subjects}
            wrappedComponentRef={this.saveFormRef}
            ageRange={this.state.ageRange}
            onAgeRangeChange={this.onAgeRangeChange}
          />
        </Bodal>
      </React.Fragment>
    );
  }

  private showModal = () => {
    this.setState({
      visible: true,
    });
  };

  private hasFieldsChanged = (values: EditableFields) =>
    values.title !== this.props.collection.title ||
    values.isPublic !== this.props.collection.isPublic ||
    values.subjects !== this.props.collection.subjects;

  private saveFormRef = formRef => {
    this.formRef = formRef;
  };

  private hasAgeRangeChanged(ageRange: AgeRange) {
    return (
      this.state.hasAgeRangeBeenTouched &&
      !isEqualTo(this.props.collection.ageRange, ageRange)
    );
  }
}
