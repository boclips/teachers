import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';
import './SavingButton.less';

declare type Props = {
  'data-qa': string;
  saving: boolean;
} & ButtonProps;

declare interface State {
  justSaved: boolean;
  saving: boolean;
  timeoutId?: number;
}

export default class SavingButton extends React.PureComponent<Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = { justSaved: false, saving: props.saving };
  }

  public UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>): void {
    const isJustSaved = this.props.saving && !nextProps.saving;
    let timeoutId;

    if (isJustSaved && !this.state.timeoutId) {
      timeoutId = setTimeout(
        function() {
          this.setState({
            ...this.state,
            justSaved: false,
            timeoutId: undefined,
          });
        }.bind(this),
        3000,
      );

      this.setState({
        ...this.state,
        timeoutId,
        justSaved: isJustSaved,
        saving: nextProps.saving,
      });
    }
  }

  public componentWillUnmount() {
    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId);
    }
  }

  public render() {
    const btnProps = { ...this.props };
    delete btnProps.saving;
    return (
      <Button {...btnProps}>
        <section
          className={`saving-button__container ${
            this.props.saving ? 'saving' : ' '
          } ${this.state.justSaved ? 'saved' : ' '}`}
        >
          {this.props.children}
          {this.props.saving || this.state.justSaved ? (
            <section
              className={`saving-button__tick-container ${
                this.props.saving ? 'saving' : ' '
              } ${this.state.justSaved ? 'saved' : ' '}`}
            >
              <div className="circle-loader">
                <div className="checkmark draw" data-qa="saved-ack" />
              </div>
            </section>
          ) : null}
        </section>
      </Button>
    );
  }
}
