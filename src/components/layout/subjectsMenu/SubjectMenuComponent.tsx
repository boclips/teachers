import { Dropdown, Menu } from 'antd';
import sortBy from 'lodash/sortBy';
import React from 'react';
import { connect } from 'react-redux';
import { Discipline } from 'src/types/Discipline';
import { DisciplineState } from 'src/types/State';
import { Link } from 'react-router-dom';
import MySubjectSVG from '../../../../resources/images/subjects.svg';
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

  private setActive = (visible) => {
    this.setState({ dropdownVisible: visible });
  };

  private renderMenu = (): React.ReactElement =>
    this.props.disciplines && (
      <Menu className="subject-menu__list subject-menu--desktop">
        {this.props.disciplines.map((discipline) => (
          <Menu.ItemGroup
            className="subject-menu__list-item-group"
            key={discipline.id}
          >
            <div
              className="subject-menu__list-item-heading"
              key={discipline.id}
            >
              <span>{discipline.name}</span>
            </div>
            {discipline.subjects &&
              sortBy(discipline.subjects, ['name']).map((subject) => (
                <Menu.Item className="subject-menu__list-item" key={subject.id}>
                  <Link
                    to={`/subjects/${subject.id}`}
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

  public render() {
    return (
      <div className="display-desktop">
        <Dropdown
          overlay={this.renderMenu()}
          trigger={['click']}
          overlayClassName="subject-menu__dropdown"
          placement="bottomCenter"
          onVisibleChange={this.setActive}
        >
          <DropdownMenuIconComponent
            dataQa="subjects-menu-open"
            active={this.state.dropdownVisible}
            icon={
              <MySubjectSVG
                className="account-menu-icon ant-dropdown-link"
                aria-haspopup="true"
                aria-hidden="true"
                tabIndex={0}
              />
            }
            label="Subjects"
          />
        </Dropdown>
      </div>
    );
  }
}

function mapStateToProps(state: DisciplineState): Props {
  return {
    disciplines: state.disciplines,
  };
}

export default connect(mapStateToProps)(SubjectMenuComponent);
