import { NoResultsFormPage } from '../../../../test-support/page-objects/NoResultsFormPage';

let onSubmit;
let page;

describe('NoResultsForm', () => {
  beforeEach(() => {
    onSubmit = jest.fn();
    page = NoResultsFormPage.load(onSubmit);
  });

  describe('when valid form', () => {
    it('invokes the callback when the form is submitted', () => {
      page.fillValidForm();

      page.submit();

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
        page.fillValidForm();
        page.setEmail('somemail');

        page.submit();

        expect(onSubmit).not.toBeCalledWith();
      });
    });

    describe('and empty query', () => {
      it('does not submit', () => {
        page.fillValidForm();
        page.setQuery('');

        page.submit();

        expect(onSubmit).not.toBeCalledWith();
      });
    });
  });
});
