import * as React from 'react';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import { Constants } from '../../../../app/AppConstants';
import './Recaptcha.less';

export interface Props {
  verifyCallback: (token: string) => void;
}

export class Recaptcha extends React.Component<Props> {
  private readonly siteKey: string;

  public constructor(props) {
    super(props);
    this.siteKey = Constants.RECAPTCHA_SITE_KEY;
  }

  public componentDidMount() {
    loadReCaptcha(this.siteKey);
  }

  public render() {
    const { verifyCallback } = this.props;
    return (
      <ReCaptcha
        sitekey={this.siteKey}
        action="registration"
        verifyCallback={verifyCallback}
      />
    );
  }
}
