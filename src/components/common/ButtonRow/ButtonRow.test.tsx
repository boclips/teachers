import { Button, Menu } from 'antd';
import { mount } from 'enzyme';
import React from 'react';
import { ButtonRow } from './ButtonRow';

it('renders a button in a button group', () => {
  const row = mount(
    <ButtonRow>
      <Button>One</Button>
    </ButtonRow>,
  );

  const group = row.find(Button.Group);
  expect(group).toExist();

  const button = group.find(Button);

  expect(button).toExist();
  expect(button.text()).toEqual('One');
});

it('has to take null renders into account in counting', () => {
  // Unfortunately a parent can't easily determine whether a child is going to render null,
  // so it is important that those nulls are taken into account in a test
  const NullRender = () => null;

  const row = mount(
    <ButtonRow overflowAt={2}>
      <NullRender />
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonRow>,
  );

  const group = row.find(Button.Group);
  expect(group).toExist();

  const buttons = group.find(Button);

  expect(buttons).toHaveLength(2);
  expect(buttons.at(0).text()).toEqual('One');
  expect(buttons.at(1).prop('data-qa')).toEqual('more-buttons');

  buttons.at(1).simulate('click');

  const menu = row.find(Menu);
  expect(menu).toExist();

  const menuButtons = menu.find(Button);
  expect(menuButtons.length).toEqual(2);
  expect(menuButtons.at(0).text()).toEqual('Two');
  expect(menuButtons.at(1).text()).toEqual('Three');
});

it('renders two buttons', () => {
  const row = mount(
    <ButtonRow>
      <Button>One</Button>
      <Button>Two</Button>
    </ButtonRow>,
  );

  const group = row.find(Button.Group);
  expect(group).toExist();

  const buttons = group.find(Button);

  expect(buttons).toHaveLength(2);
  expect(buttons.at(0).text()).toEqual('One');
  expect(buttons.at(1).text()).toEqual('Two');
});

it('renders buttons and wraps overflow into a dropdown', () => {
  const row = mount(
    <ButtonRow overflowAt={2}>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
      <Button>Four</Button>
    </ButtonRow>,
  );

  const group = row.find(Button.Group);
  expect(group).toExist();

  const buttons = group.find(Button);

  expect(buttons).toHaveLength(3);
  expect(buttons.at(0).text()).toEqual('One');
  expect(buttons.at(1).text()).toEqual('Two');
  expect(buttons.at(2).prop('data-qa')).toEqual('more-buttons');

  buttons.at(2).simulate('click');

  const menu = row.find(Menu);
  expect(menu).toExist();

  const menuButtons = menu.find(Button);
  expect(menuButtons.length).toEqual(2);
  expect(menuButtons.at(0).text()).toEqual('Three');
  expect(menuButtons.at(1).text()).toEqual('Four');
});
