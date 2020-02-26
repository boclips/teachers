import { Dropdown, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MySubjectSVG from '../../../../resources/images/subjects.svg';
import { Discipline } from '../../../types/Discipline';
import { DisciplineState } from '../../../types/State';
import DropdownMenuIconComponent from '../navigation/DropdownMenuIconComponent';
import './SubjectMenuComponent.less';

interface Props {
  disciplines: Discipline[];
}

interface State {
  dropdownVisible: boolean;
}

class SubjectMenuComponent extends React.Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      dropdownVisible: false,
    };
  }

  private setActive = visible => {
    this.setState({ dropdownVisible: visible });
  };

  public render() {
    return (
      <div className="display-desktop">
        <Dropdown
          overlay={this.props.disciplines && this.renderMenu()}
          trigger={['click']}
          overlayClassName="subject-menu__dropdown"
          placement="bottomCenter"
          onVisibleChange={this.setActive}
        >
          <DropdownMenuIconComponent
            dataQa={'subjects-menu-open'}
            active={this.state.dropdownVisible}
            icon={
              <MySubjectSVG
                className="account-menu-icon ant-dropdown-link"
                aria-haspopup="true"
                aria-hidden="true"
                tabIndex={0}
              />
            }
            label={'Subjects'}
          />
        </Dropdown>
      </div>
    );
  }

  private renderMenu = (): React.ReactFragment => (
    <Menu className="subject-menu__list subject-menu--desktop">
      {this.props.disciplines.map(discipline => (
        <Menu.ItemGroup
          className="subject-menu__list-item-group"
          key={discipline.id}
        >
          {
            <Menu.Item
              className="subject-menu__list-item-heading"
              key={discipline.id}
            >
              <Link
                to={`/discover-collections?discipline=${discipline.id}`}
                className="link--tabbable"
              >
                {discipline.name}
              </Link>
            </Menu.Item>
          }
          {discipline.subjects &&
            discipline.subjects.map(subject => (
              <Menu.Item className="subject-menu__list-item" key={subject.id}>
                <Link
                  to={`/discover-collections?subject=${subject.id}`}
                  className="link--tabbable"
                >
                  {subject.name}
                </Link>
              </Menu.Item>
            ))}
        </Menu.ItemGroup>
      ))}
    </Menu>
  );
}

function mapStateToProps(state: DisciplineState): Props {
  return {
    disciplines: state.disciplines,
  };
}

export default connect(mapStateToProps)(SubjectMenuComponent);
