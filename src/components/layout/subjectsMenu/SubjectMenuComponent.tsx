import { Dropdown, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Discipline } from '../../../types/Discipline';
import { DisciplineState } from '../../../types/State';
import './SubjectMenuComponent.less';
import SubjectsMenuIconComponent from './SubjectsMenuIconComponent';

interface Props {
  disciplines: Discipline[];
}

class SubjectMenuComponent extends React.Component<Props> {
  public render() {
    return (
      <div className="display-desktop">
        <Dropdown
          overlay={this.props.disciplines && this.renderMenu()}
          trigger={['click']}
          overlayClassName="subject-menu__dropdown"
          placement="bottomCenter"
        >
          <SubjectsMenuIconComponent />
        </Dropdown>
      </div>
    );
  }

  private renderMenu = (): React.ReactFragment => (
    <Menu className="subject-menu__list subject-menu--desktop">
      {this.props.disciplines.map(discipline => {
        return (
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
        );
      })}
    </Menu>
  );
}

function mapStateToProps(state: DisciplineState): Props {
  return {
    disciplines: state.disciplines,
  };
}

export default connect(mapStateToProps)(SubjectMenuComponent);