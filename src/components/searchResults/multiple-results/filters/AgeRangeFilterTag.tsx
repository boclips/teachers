import { AgeRange } from "../../../../types/AgeRange";
import React from "react";
import { ClosableTag } from "../../../video/tags/Tag";
import { updateSearchParamsAction } from "../../redux/actions/updateSearchParametersActions";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


interface Props {
    ageRange?: AgeRange;
}

interface DispatchProps {
    onClose: () => void;
}

class AgeRangeFilterTag extends React.Component<Props & DispatchProps> {
    public render() {
        return this.props.ageRange == null ? null : (
            <ClosableTag
                dataQa="age-range-filter-tag"
                label="Age Range"
                value={this.props.ageRange.getLabel()}
                onClose={this.props.onClose}
            />)
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    onClose: () => {
        dispatch(
            updateSearchParamsAction({
                age_range_min: undefined,
                age_range_max: undefined,
            }),
        );
    },
});

export default connect(null, mapDispatchToProps)(AgeRangeFilterTag)
