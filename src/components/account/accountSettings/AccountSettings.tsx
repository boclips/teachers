import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ShareCode } from 'src/components/account/accountSettings/ShareCode';
import { UserProfile } from '../../../services/users/UserProfile';
import { Country } from '../../../types/Country';
import { Links } from '../../../types/Links';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';
import { fetchCountriesAction } from '../onboarding/redux/actions/fetchCountriesAction';
import './AccountSettings.less';
import { EditProfileForm } from './EditProfileForm';
import { EditSchoolSettingsForm } from './EditSchoolSettingsForm';
import { Profile } from './Profile';
import SchoolSettings from './SchoolSettings';

interface AccountProps {
  userProfile: UserProfile;
  subjects: Subject[];
  links: Links;
  countries: Country[];
}

interface DispatchProps {
  fetchCountries: () => void;
}

interface InternalState {
  editProfileForm: boolean;
  editSchoolSettingsForm: boolean;
}

class AccountSettings extends React.Component<
  AccountProps & DispatchProps,
  InternalState
> {
  constructor(props) {
    super(props);
    this.state = {
      editProfileForm: false,
      editSchoolSettingsForm: false,
    };
  }

  public componentDidMount() {
    this.props.fetchCountries();
    this.setState((state) => ({ ...state }));
  }

  private isUserAmerican = () =>
    this.props.userProfile.country &&
    this.props.userProfile.country.id === 'USA';

  private findUSA = (): Country =>
    this.props.countries.find((country) => country.id === 'USA');

  private toggleEditProfileForm = () => {
    this.setState((state) => {
      return {
        ...state,
        editProfileForm: !state.editProfileForm,
      };
    });
  };

  private toggleSchoolSettingsForm = () => {
    this.setState((state) => ({
      ...state,
      editSchoolSettingsForm: !state.editSchoolSettingsForm,
    }));
  };

  private showSettings = () =>
    !(this.state.editProfileForm || this.state.editSchoolSettingsForm);

  public render() {
    return (
      <>
        {this.showSettings() && (
          <section>
            <h1 className="extra-big">Settings</h1>
            <ShareCode shareCode={this.props.userProfile.shareCode} />
            <Profile
              firstName={this.props.userProfile.firstName}
              onEdit={this.toggleEditProfileForm}
              ages={this.props.userProfile.ages}
              lastName={this.props.userProfile.lastName}
              subjects={this.props.userProfile.subjects}
            />
            {this.isUserAmerican() && (
              <>
                <hr className="account-settings__divider" />
                <SchoolSettings
                  school={this.props.userProfile.school.name}
                  state={this.props.userProfile.state.name}
                  onEdit={this.toggleSchoolSettingsForm}
                />
              </>
            )}
          </section>
        )}

        {this.state.editProfileForm && (
          <section>
            <h1 className="extra-big">Edit profile</h1>
            <EditProfileForm
              userProfile={this.props.userProfile}
              subjects={this.props.subjects}
              toggleForm={this.toggleEditProfileForm}
              links={this.props.links}
            />
          </section>
        )}

        {this.state.editSchoolSettingsForm && (
          <section>
            <h1 className="extra-big">Edit School</h1>
            <EditSchoolSettingsForm
              country={this.findUSA()}
              toggleForm={this.toggleSchoolSettingsForm}
              links={this.props.links}
              userProfile={this.props.userProfile}
            />
          </section>
        )}
      </>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchCountries: () => dispatch(fetchCountriesAction()),
  };
}

function mapStateToProps(state: State): AccountProps {
  return {
    userProfile: state.user,
    subjects: state.subjects,
    links: state.links.entries,
    countries: state.countries,
  };
}

export default connect<AccountProps, DispatchProps, {}>(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSettings);
