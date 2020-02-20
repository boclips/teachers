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
    this.siteKey = this.getSiteKey();
  }

  public componentDidMount() {
    loadReCaptcha(this.siteKey);
  }

  public render() {
    return (
      <ReCaptcha
        sitekey={this.siteKey}
        action="registration"
        verifyCallback={this.props.verifyCallback}
      />
    );
  }

  private getSiteKey = (): string => {
    const environment = Constants.ENVIRONMENT;
    switch (environment) {
      case 'STAGING':
        return '6LdK45wUAAAAAAPmd_2CIZnj1mYLd2mPIHMoeZ7j';
      case 'PRODUCTION':
        return '6Lf64pwUAAAAAH1oPu0zEJB79M4KJSU0q2VQkp3v';
      case 'TESTING':
        return '6Ldi6JwUAAAAACMgLoshiwBEZNDmnllXrAEIMN_y';
      default:
        throw Error(
          `No reCaptcha site token found for environment ${environment}`,
        );
    }
  };
}
