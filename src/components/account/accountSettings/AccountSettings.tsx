import React from 'react';
import { connect } from 'react-redux';
import { UserProfile } from '../../../services/users/UserProfile';
import { Links } from '../../../types/Links';
import State from '../../../types/State';
import { Subject } from '../../../types/Subject';

import './AccountSettings.less';
import { Profile } from './Profile';
import { ProfileForm } from './ProfileForm';

interface Props {
  userProfile: UserProfile;
  subjects: Subject[];
  links: Links;
}

interface StateProps {
  editForm: boolean;
}

class AccountSettings extends React.Component<Props, StateProps> {
  private toggleForm = () => {
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
          userProfile={this.props.userProfile}
          subjects={this.props.subjects}
          toggleForm={this.toggleForm}
          links={this.props.links}
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
    links: state.links,
  };
}

export default connect<Props>(mapStateToProps)(AccountSettings);
