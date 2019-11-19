import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import classnames from 'classnames';
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
  public constructor(props: Props, context: any) {
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
    const { saving: _, ...btnProps } = this.props;

    return (
      <Button {...btnProps}>
        <section
          className={classnames('saving-button__container', {
            saving: this.props.saving,
            saved: this.state.justSaved,
          })}
        >
          {this.props.children}
          {this.props.saving || this.state.justSaved ? (
            <section
              className={classnames('saving-button__tick-container', {
                saving: this.props.saving,
                saved: this.state.justSaved,
              })}
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
