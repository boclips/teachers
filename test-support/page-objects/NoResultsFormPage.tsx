import { mount } from 'enzyme';
import React from 'react';
import NoResultsForm from '../../src/components/searchResults/no-results/NoResultsForm';
import { By } from '../By';
import EventSimulator from '../EventSimulator';

export class NoResultsFormPage {
  private readonly wrapper;
  private events;

  private constructor(wrapper) {
    this.wrapper = wrapper;
    this.events = new EventSimulator(this.wrapper);
  }

  public static load(onSubmitCallback, query = 'thea is killing it') {
    return new NoResultsFormPage(
      mount(
        <NoResultsForm onSuccessfulSubmit={onSubmitCallback} query={query} />,
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
