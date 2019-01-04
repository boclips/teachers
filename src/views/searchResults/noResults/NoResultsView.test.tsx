import { message } from 'antd';
import axios from 'axios';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import eventually from '../../../../test-support/eventually';
import { LinksFactory } from '../../../../test-support/factories';
import { NoResultsFormPage } from '../../../../test-support/page-objects/NoResultsFormPage';
import AddNoResultsForm from '../../../components/searchResults/no-results/NoResultsForm';
import NoResultsFormSubmitted from '../../../components/searchResults/no-results/NoResultsFormSubmitted';
import { Link } from '../../../types/Link';
import Mock = jest.Mock;
import NoResultsView from './NoResultsView';

describe('when form is submitted', () => {
  let noResultsView: ReactWrapper;
  let form: NoResultsFormPage;

  beforeEach(() => {
    noResultsView = mount(
      <NoResultsView
        query={'noresult'}
        links={LinksFactory.sample({
          createNoSearchResultsEvent: new Link({ href: '/events/xxx' }),
        })}
      />,
    );
    form = NoResultsFormPage.fromWrapper(noResultsView);
  });

  it('renders confirmation message', async () => {
    axios.post = jest.fn(() => Promise.resolve({ data: {} }));
    form.fillValidForm();
    form.submit();

    await eventually(() => {
      noResultsView.update();
      expect(noResultsView.find(AddNoResultsForm)).not.toExist();
      expect(noResultsView.find(NoResultsFormSubmitted)).toExist();
    });
  });

  describe('and server returns error', () => {
    it('shows error', async () => {
      axios.post = jest.fn(() => Promise.reject());
      message.error = jest.fn();

      form.fillValidForm();
      form.submit();

      await eventually(() => {
        noResultsView.update();
        expect(message.error).toHaveBeenCalled();
      });
    });
  });

  it('sends no-results event', async () => {
    axios.post = jest.fn(() => Promise.resolve({ data: {} }));
    form.fillValidForm('name', 'query', 'email@boclips.com', 'description');
    form.submit();

    const axiosPost = axios.post as Mock;
    const requestUrl = axiosPost.mock.calls[0][0];
    const requestBody = axiosPost.mock.calls[0][1];
    expect(requestUrl).toEqual('/events/xxx');
    expect(requestBody.name).toEqual('name');
    expect(requestBody.query).toEqual('query');
    expect(requestBody.email).toEqual('email@boclips.com');
    expect(requestBody.description).toEqual('description');
  });
});
