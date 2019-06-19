import { Button, Icon } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import filterIconSvg from '../../../../../resources/images/filter-icon.svg';
import { default as AppSate } from '../../../../types/State';
import Bodal from '../../../common/Bodal';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import './FilterButton.less';
import FilterButtonForm, {
  FilterFormEditableFields,
  FilterProps,
} from './FilterButtonForm';

interface FilterRequest {
  duration: {
    min: number;
    max: number;
  };
}

interface DispatchProps {
  onSubmit: (FilterRequest) => void;
}

interface StateProps extends FilterProps {}

interface State {
  visible: boolean;
}

export class FilterButton extends React.Component<
  DispatchProps & StateProps,
  State
> {
  private svg = filterIconSvg as React.ComponentType<CustomIconComponentProps>;
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
        <Button
          onClick={this.handleOpen}
          data-qa="open-filter-modal"
          className="filter-button"
        >
          <Icon component={this.svg} />
          Filter
        </Button>
        <Bodal
          title="Filter results by"
          cancelText="Cancel"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={this.state.visible}
        >
          <FilterButtonForm
            minDuration={this.props.minDuration}
            maxDuration={this.props.maxDuration}
            wrappedComponentRef={this.saveFormRef}
          />
        </Bodal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ router }: AppSate): StateProps => ({
  minDuration:
    +queryString.parse(router.location.search).min_duration / 60 || null,
  maxDuration:
    +queryString.parse(router.location.search).max_duration / 60 || null,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (fields: FilterFormEditableFields) => {
      dispatch(
        bulkUpdateSearchParamsAction([
          {
            min_duration: fields.duration.min || undefined,
            max_duration: fields.duration.max || undefined,
          },
        ]),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterButton);
