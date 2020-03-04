import { Button, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DurationRange } from 'src/types/DurationRange';
import { Range } from 'src/types/Range';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import FilterIconSVG from 'resources/images/filter-icon.svg';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import Bodal from '../../../common/Bodal';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../../common/higherOrderComponents/withMediaBreakPoint';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import './FilterButton.less';
import FilterButtonForm, { FilterFormEditableFields } from './FilterButtonForm';

interface FilterRequest {
  duration?: DurationRange;
  ageRange?: Range;
  subjects?: string[];
}

interface DispatchProps {
  onSubmit: (FilterRequest) => void;
}

interface State {
  visible: boolean;
}

type Props = WithAppliedSearchParametersProps &
  DispatchProps &
  WithMediaBreakPointProps;

class FilterButton extends React.Component<Props, State> {
  private formRef: any;

  public constructor(props: Props) {
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

      filterRequest.duration =
        values.duration.min && new DurationRange(values.duration);
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
          <Icon component={FilterIconSVG} />
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
            duration={this.props.duration && this.props.duration[0]}
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (filterRequest: FilterRequest) => {
    dispatch(
      bulkUpdateSearchParamsAction([
        {
          duration: filterRequest.duration && [filterRequest.duration],
        },
        {
          age_range_min: filterRequest.ageRange && filterRequest.ageRange.min,
          age_range_max:
            (filterRequest.ageRange && filterRequest.ageRange.max) || undefined,
        },
        {
          subject: filterRequest.subjects,
        },
      ]),
    );
  },
});

const FilterButtonWithMediaBreakPoint = withMediaBreakPoint<Props>(
  FilterButton,
);

const ConnectedFilterButton = connect(
  null,
  mapDispatchToProps,
)(FilterButtonWithMediaBreakPoint);

class FilterButtonWrapper extends React.Component<
  WithAppliedSearchParametersProps
> {
  public render() {
    return <ConnectedFilterButton />;
  }
}

export { FilterButtonWithMediaBreakPoint };

export default withAppliedSearchParameters(FilterButtonWrapper);
