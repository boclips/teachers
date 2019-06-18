import { Button, Modal } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bulkUpdateSearchParamsAction } from '../redux/actions/updateSearchParametersActions';
import DurationConverter from './DurationConverter';
import FilterButtonForm, { FilterFormEditableFields } from './FilterButtonForm';

interface FilterRequest {
  duration: {
    min: number;
    max: number;
  };
}

interface DispatchProps {
  onSubmit: (FilterRequest) => void;
}

interface State {
  visible: boolean;
}

export class FilterButton extends React.Component<DispatchProps, State> {
  private formRef: any;
  constructor(props: DispatchProps) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  private handleOpen = () => {
    this.setState({
      visible: true,
    });
  };

  private handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  private handleOk = () => {
    this.setState({
      visible: false,
    });

    const form = this.formRef.props.form;

    form.validateFields((_, values: FilterFormEditableFields) => {
      if (values.duration) {
        this.props.onSubmit({ duration: values.duration });
      }
    });
  };

  private saveFormRef = formRef => {
    this.formRef = formRef;
  };

  public render() {
    return (
      <React.Fragment>
        <Button onClick={this.handleOpen} data-qa="open-filter-modal" />
        <Modal
          cancelText="Cancel"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={this.state.visible}
        >
          <FilterButtonForm wrappedComponentRef={this.saveFormRef} />
        </Modal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (fields: FilterFormEditableFields) => {
      const durationConverter = new DurationConverter();
      const minIso = durationConverter.secondsToIso(fields.duration.min);
      const maxIso = durationConverter.secondsToIso(fields.duration.max);

      dispatch(
        bulkUpdateSearchParamsAction([
          {
            min_duration: minIso,
            max_duration: maxIso,
          },
        ]),
      );
    },
  };
};

export default connect<null, DispatchProps>(
  null,
  mapDispatchToProps,
)(FilterButton);
