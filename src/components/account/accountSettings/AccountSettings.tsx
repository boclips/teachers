import React from 'react';
import { connect } from 'react-redux';
import { UserProfile } from '../../../services/users/UserProfile';
import { AgeRange } from '../../../types/AgeRange';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';

import './AccountSettings.less';
import { Profile } from './Profile';
import { ProfileForm } from './ProfileForm';

interface Props {
  userProfile: UserProfile;
  subjects: Subject[];
  ageRanges: AgeRange[];
}

interface StateProps {
  editForm: boolean;
}

class AccountSettings extends React.Component<Props, StateProps> {
  private toggleForm = () => {
    console.log('setting form state');
    this.setState({ editForm: !this.state.editForm });
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      editForm: false,
    };
  }

  public render() {
    return this.state.editForm ? (
      <section>
        <h1 className="extra-big">Edit profile</h1>
        <ProfileForm
          firstName={this.props.userProfile.firstName}
          lastName={this.props.userProfile.lastName}
          subjects={this.props.subjects}
          ages={this.props.ageRanges}
          cancelForm={this.toggleForm}
        />
      </section>
    ) : (
      <section>
        <h1 className="extra-big">Settings</h1>
        <Profile
          firstName={this.props.userProfile.firstName}
          onEdit={this.toggleForm}
          ages={this.props.userProfile.ages}
          lastName={this.props.userProfile.lastName}
          subjects={this.props.userProfile.subjects}
        />
      </section>
    );
  }
}

function mapStateToProps(state: State): Props {
  return {
    userProfile: state.user,
    subjects: state.subjects,
    ageRanges: state.ageRanges,
  };
}

export default connect<Props>(mapStateToProps)(AccountSettings);
