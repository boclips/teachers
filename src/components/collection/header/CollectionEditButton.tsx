import { Button } from 'antd';
import React from 'react';
import { VideoCollection } from '../../../types/VideoCollection';
import Bodal from '../../common/Bodal';
import { EditCollectionRequest } from '../redux/actions/editCollectionAction';

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
}

export default class CollectionEditButton extends React.PureComponent<
  Props,
  State
> {
  private formRef: any;

  private sliderRange = {
    min: 3,
    max: 19,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      hasAgeRangeBeenTouched: false,
    };
  }

  private onAgeRangeChange = () => {
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
          ? this.convertArrayToAgeRange(values.ageRange)
          : null,
      };

      form.resetFields();

      if (this.hasFieldsChanged(values)) {
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
          wrapClassName="generic-modal edit-collection-modal"
        >
          <CollectionEditForm
            title={this.props.collection.title}
            isPublic={this.props.collection.isPublic}
            subjects={this.props.collection.subjects}
            wrappedComponentRef={this.saveFormRef}
            ageRange={this.getAgeRangeValue(this.props.collection.ageRange)}
            onAgeRangeChange={this.onAgeRangeChange}
            sliderRange={this.sliderRange}
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
    values.subjects !== this.props.collection.subjects ||
    this.hasAgeRangeChanged(values.ageRange);

  private saveFormRef = formRef => {
    this.formRef = formRef;
  };

  private getAgeRangeValue(ageRange?: AgeRange): number[] {
    if (ageRange == null) {
      return [this.sliderRange.min, this.sliderRange.max];
    } else {
      return [ageRange.min, ageRange.max || this.sliderRange.max];
    }
  }

  private convertArrayToAgeRange(ageRangeFromForm?: number[]): AgeRange {
    if (ageRangeFromForm == null) {
      return null;
    }

    if (ageRangeFromForm[1] === this.sliderRange.max) {
      return {
        label: `${ageRangeFromForm[0]}+`,
        min: ageRangeFromForm[0],
      };
    } else {
      return {
        label: `${ageRangeFromForm[0]}-${ageRangeFromForm[1]}`,
        min: ageRangeFromForm[0],
        max: ageRangeFromForm[1],
      };
    }
  }

  private hasAgeRangeChanged(ageRange: number[]) {
    return (
      this.state.hasAgeRangeBeenTouched &&
      this.convertArrayToAgeRange(ageRange).label !==
        this.props.collection.ageRange.label
    );
  }
}
