import { Button, Icon } from 'antd';
import { CustomIconComponentProps } from 'antd/lib/icon';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import filterIconSvg from '../../../../../resources/images/filter-icon.svg';
import MediaBreakpoints from '../../../../types/MediaBreakpoints';
import { Range } from '../../../../types/Range';
import Bodal from '../../../common/Bodal';
import withMediaBreakPoint, {
  WithMediaBreakPointProps,
} from '../../../common/higerOrderComponents/withMediaBreakPoint';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import AppliedFiltersProvider, {
  AppliedFiltersInjectedProps,
} from './AppliedFiltersProvider';
import './FilterButton.less';
import FilterButtonForm, { FilterFormEditableFields } from './FilterButtonForm';

interface FilterRequest {
  duration?: Range;
  ageRange?: Range;
  subjects?: string[];
}

interface DispatchProps {
  onSubmit: (FilterRequest) => void;
}

interface State {
  visible: boolean;
}

type Props = AppliedFiltersInjectedProps &
  DispatchProps &
  WithMediaBreakPointProps;

class FilterButton extends React.Component<Props, State> {
  private svg = filterIconSvg as React.ComponentType<CustomIconComponentProps>;
  private formRef: any;

  constructor(props: DispatchProps & WithMediaBreakPointProps) {
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
      const filterRequest: FilterRequest = {};

      filterRequest.duration = values.duration;
      filterRequest.ageRange = values.ageRange;
      filterRequest.subjects = values.subjects;

      if (form.isFieldsTouched() || values.subjects !== this.props.subjectIds) {
        this.props.onSubmit(filterRequest);
      }
    });
  };

  private saveFormRef = formRef => {
    this.formRef = formRef;
  };

  private getFiltersAppliedText = () =>
    this.props.mediaBreakpoint.width <= MediaBreakpoints.md.width &&
    this.props.numberOfFiltersApplied > 0
      ? `(${this.props.numberOfFiltersApplied})`
      : ``;

  public render() {
    return (
      <React.Fragment>
        <Button
          onClick={this.handleOpen}
          data-qa="open-filter-modal"
          className="filter-button"
        >
          <Icon component={this.svg} />
          <span data-qa="filter-button-text">
            Filter {this.getFiltersAppliedText()}
          </span>
        </Button>
        <Bodal
          title="Filter results by"
          cancelText="Cancel"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={this.state.visible}
        >
          <FilterButtonForm
            durationMin={this.props.durationMin}
            durationMax={this.props.durationMax}
            ageRangeMin={this.props.ageRangeMin}
            ageRangeMax={this.props.ageRangeMax}
            subjectIds={this.props.subjectIds}
            wrappedComponentRef={this.saveFormRef}
          />
        </Bodal>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSubmit: (filterRequest: FilterRequest) => {
      dispatch(
        bulkUpdateSearchParamsAction([
          {
            duration_min: filterRequest.duration && filterRequest.duration.min,
            duration_max:
              (filterRequest.duration && filterRequest.duration.max) ||
              undefined,
          },
          {
            age_range_min: filterRequest.ageRange && filterRequest.ageRange.min,
            age_range_max:
              (filterRequest.ageRange && filterRequest.ageRange.max) ||
              undefined,
          },
          {
            subjects: filterRequest.subjects,
          },
        ]),
      );
    },
  };
};

const FilterButtonWithMediaBreakPoint = withMediaBreakPoint<Props>(
  FilterButton,
);

const ConnectedFilterButton = connect(
  null,
  mapDispatchToProps,
)(FilterButtonWithMediaBreakPoint);

class FilterButtonWrapper extends React.Component<AppliedFiltersInjectedProps> {
  public render() {
    return (
      <AppliedFiltersProvider>
        <ConnectedFilterButton />
      </AppliedFiltersProvider>
    );
  }
}

export { FilterButtonWithMediaBreakPoint };

export default FilterButtonWrapper;
