import React from 'react';
import { BoclipsSlider } from './BoclipsSlider';
import { SliderValue } from 'antd/lib/slider';

interface Props {
    onChange: (e) => void;
    sliderRange?: { min: number, max: number };
}

class AgeRangeSlider extends React.Component<Props> {
    private getMarks = () => ({
        3: '3',
        5: '5',
        7: '7',
        9: '9',
        11: '11',
        14: '14',
        16: '16',
        18: '18',
        19: '19+'
    });

    private formatToolTip = (value: number) => {
        return value >= 19 ? `${value}+` : `${value}`;
    };

    public render() {
        return (<BoclipsSlider
            defaultValue={[
                this.props.sliderRange.min,
                this.props.sliderRange.max
            ]}
            range={true}
            marks={this.getMarks()}
            onChange={this.handleChange}
            step={null}
            tipFormatter={this.formatToolTip}
        />)
    }

    private handleChange = (ageRangeValue: SliderValue) => {
        if (!Array.isArray(ageRangeValue) || ageRangeValue.length !== 2) {
            return;
        }

        const min = ageRangeValue[0];
        const max = ageRangeValue[1];

        if (min == null || max == null) {
            return;
        }

        this.props.onChange({
            min: min,
            max: max == 19 ? null : max
        });
    }
}

export default AgeRangeSlider