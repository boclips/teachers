import { shallow } from 'enzyme';
import React from 'react';
import { By } from '../../../test-support/By';
import { CollectionTitle } from './CollectionTitle';

let callback;
let component;

const getDisplayedText = () =>
  component
    .update()
    .find(By.dataQa('collection-name'))
    .text();

const clickEdit = () =>
  component.find(By.dataQa('collection-name-edit')).simulate('click');

const typeText = (text: string) =>
  component
    .update()
    .find(By.dataQa('collection-name-edit-input'))
    .simulate('change', { target: { value: text } });

beforeEach(() => {
  callback = jest.fn();
  component = shallow(
    <CollectionTitle title="Title of Collection" onEdit={callback} />,
  );
});

it('Renders an element with the title in', () => {
  expect(getDisplayedText()).toEqual('Title of Collection');
});

describe('When title is edited', () => {
  beforeEach(() => {
    clickEdit();
    typeText('New title');

    component
      .update()
      .find(By.dataQa('collection-name-edit-submit'))
      .simulate('click');
  });

  test('Invokes callback', () => {
    expect(callback).toHaveBeenCalledWith('New title');
  });

  test('Goes back to view state', () => {
    expect(getDisplayedText()).toEqual('New title');
  });
});

describe('When edit cancelled', () => {
  beforeEach(() => {
    clickEdit();
    typeText('bla bla bla');
    component
      .update()
      .find(By.dataQa('collection-name-edit-cancel'))
      .simulate('click');
  });

  it('Does not invoke the callback', () => {
    expect(callback).not.toHaveBeenCalled();
  });

  it('Goes back to the view state', () => {
    expect(getDisplayedText()).toEqual('Title of Collection');
  });
});
