import {FormInstance} from "antd/lib/form";
import { Button } from 'antd';
import Icon from '@ant-design/icons';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DurationRange } from 'src/types/DurationRange';
import MediaBreakpoints from 'src/types/MediaBreakpoints';
import FilterIconSVG from 'resources/images/filter-icon.svg';
import {
  withAppliedSearchParameters,
  WithAppliedSearchParametersProps,
} from 'src/components/common/higherOrderComponents/withAppliedSearchParametersProps';
import { Range } from 'src/types/Range';
import Bodal from '../../../common/Bodal';
import {
  withMediaBreakPoint,
  WithMediaBreakPointProps,
} from '../../../common/higherOrderComponents/withMediaBreakPoint';
import { bulkUpdateSearchParamsAction } from '../../redux/actions/updateSearchParametersActions';
import './FilterButton.less';
import FilterButtonForm from './FilterButtonForm';

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
  private formRef = React.createRef<FormInstance>();

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

    const form = this.formRef.current;
    form.validateFields().then(values => {
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
            formRef={this.formRef}
            duration={this.props.duration && this.props.duration[0]}
            ageRangeMin={this.props.ageRangeMin}
            ageRangeMax={this.props.ageRangeMax}
            subjectIds={this.props.subjectIds}
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
          age_range: undefined,
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
