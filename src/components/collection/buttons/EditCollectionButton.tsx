import { Button } from 'antd';
import Icon from 'antd/lib/icon';
import React from 'react';
import EditCollectionSVG from '../../../../resources/images/edit-collection.svg';
import { AgeRange, isEqualTo } from '../../../types/AgeRange';
import { VideoCollection } from '../../../types/VideoCollection';
import Bodal from '../../common/Bodal';
import { EditCollectionRequest } from '../redux/actions/editCollectionAction';
import './EditCollectionButton.less';
import CollectionEditForm, { EditableFields } from './EditCollectionForm';

interface Props {
  collection: VideoCollection;
  canSave: boolean;
  onUpdate: (request: EditCollectionRequest) => void;
  classNameModifier?: string;
}

interface State {
  visible: boolean;
  hasAgeRangeBeenTouched: boolean;
}

export default class EditCollectionButton extends React.PureComponent<
  Props,
  State
> {
  private formRef: any;

  public constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      hasAgeRangeBeenTouched: false,
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

      if (
        this.hasFieldsChanged(values) ||
        this.hasAgeRangeChanged(values.ageRange)
      ) {
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
          description:
            values.description !== this.props.collection.description
              ? values.description
              : null,
        };

        form.resetFields();
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
          size={'large'}
          onClick={this.showModal}
          className={`collection-edit__button ${this.props.classNameModifier ||
            ''}`}
          data-qa="collection-edit-button"
          disabled={!this.props.canSave || this.state.visible}
        >
          <Icon
            theme="filled"
            aria-label="Edit collection"
            component={EditCollectionSVG}
          />
          Edit
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
          wrapClassName="edit-collection-modal"
        >
          <CollectionEditForm
            title={this.props.collection.title}
            isPublic={this.props.collection.isPublic}
            subjects={this.props.collection.subjects}
            wrappedComponentRef={this.saveFormRef}
            ageRange={this.props.collection.ageRange}
            onAgeRangeChange={this.onAgeRangeChange}
            description={this.props.collection.description}
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
    values.description !== this.props.collection.description;

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
