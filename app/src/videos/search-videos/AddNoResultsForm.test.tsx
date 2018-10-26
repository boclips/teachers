import { mount } from 'enzyme';
import React from 'react';
import { By } from '../../../test-support/By';
import EventSimulator from '../../../test-support/EventSimulator';
import AddNoResultsForm from './AddNoResultsForm';

let onSubmit;
let form;

describe('AddNoResultsForm', () => {
  beforeEach(() => {
    onSubmit = jest.fn();
    form = NoResultsFormPage.getInstance(onSubmit);
  });

  describe('when valid form', () => {
    it('invokes the callback when the form is submitted', () => {
      form.fillValidForm();

      form.submit();

      const expectedData = {
        name: 'some-name',
        query: 'some query',
        email: 'somemail@boclips.com',
        description: 'some description',
      };
      expect(onSubmit).toBeCalledWith(expectedData);
    });
  });

  describe('when invalid form', () => {
    describe('and invalid email', () => {
      it('does not submit', () => {
        form.fillValidForm();
        form.setEmail('somemail');

        form.submit();

        expect(onSubmit).not.toBeCalledWith();
      });
    });

    describe('and empty query', () => {
      it('does not submit', () => {
        form.fillValidForm();
        form.setQuery('');

        form.submit();

        expect(onSubmit).not.toBeCalledWith();
      });
    });
  });
});

export class NoResultsFormPage {
  private readonly wrapper;
  private events;

  private constructor(wrapper) {
    this.wrapper = wrapper;
    this.events = new EventSimulator(this.wrapper);
  }

  public static getInstance(onSubmitCallback, query = 'thea is killing it') {
    return new NoResultsFormPage(
      mount(
        <AddNoResultsForm
          onSuccessfulSubmit={onSubmitCallback}
          query={query}
        />,
      ),
    );
  }

  public static fromWrapper(wrapper) {
    return new NoResultsFormPage(wrapper);
  }

  public fillValidForm(
    name = 'some-name',
    query = 'some query',
    email = 'somemail@boclips.com',
    description = 'some description',
  ) {
    this.setName(name);
    this.setQuery(query);
    this.setEmail(email);
    this.setDescription(description);
  }

  public submit() {
    this.events.submit(this.wrapper.find(By.dataQa('no-results-form', 'form')));
  }

  public setName(name: string) {
    return this.events.setText(
      name,
      this.wrapper.find(By.dataQa('name', 'input')),
    );
  }

  public setQuery(query: string) {
    return this.events.setText(
      query,
      this.wrapper.find(By.dataQa('query', 'input')),
    );
  }

  public setEmail(email: string) {
    return this.events.setText(
      email,
      this.wrapper.find(By.dataQa('email-address', 'input')),
    );
  }

  public setDescription(description: string) {
    return this.events.setText(
      description,
      this.wrapper.find(By.dataQa('description', 'textarea')),
    );
  }
}
