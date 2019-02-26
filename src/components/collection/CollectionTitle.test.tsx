import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import React from 'react';
import { By } from '../../../test-support/By';
import { CollectionTitle } from './CollectionTitle';

let callback;
let title;

export class CollectionTitleHelper {
  constructor(public component: ShallowWrapper | ReactWrapper) {}

  public getDisplayedText = () =>
    this.component
      .update()
      .find(By.dataQa('collection-name'))
      .text();

  public clickEdit = () =>
    this.component.find(By.dataQa('collection-name-edit')).simulate('click');

  public typeText = (text: string) =>
    this.component
      .update()
      .find(By.dataQa('collection-name-edit-input', 'input'))
      .simulate('change', { target: { value: text } });

  public clickCancel = () =>
    this.component
      .update()
      .find(By.dataQa('collection-name-edit-cancel', 'button'))
      .simulate('click');

  public submit = () =>
    this.component
      .update()
      .find(By.dataQa('collection-name-edit-submit', 'button'))
      .simulate('click');
}

beforeEach(() => {
  callback = jest.fn();
  title = new CollectionTitleHelper(
    mount(<CollectionTitle title="Title of Collection" onEdit={callback} />),
  );
});

it('Renders an element with the title in', () => {
  expect(title.getDisplayedText()).toEqual('Title of Collection');
});

describe('When title is edited', () => {
  beforeEach(() => {
    title.clickEdit();
    title.typeText('New title');
    title.submit();
  });

  test('Invokes callback', () => {
    expect(callback).toHaveBeenCalledWith('New title');
  });

  test('Goes back to view state', () => {
    expect(title.getDisplayedText()).toEqual('New title');
  });
});

describe('When edit cancelled', () => {
  beforeEach(() => {
    title.clickEdit();
    title.typeText('bla bla bla');
    title.clickCancel();
  });

  it('Does not invoke the callback', () => {
    expect(callback).not.toHaveBeenCalled();
  });

  it('Renders non editable title', () => {
    expect(title.getDisplayedText()).toEqual('Title of Collection');
  });
});
