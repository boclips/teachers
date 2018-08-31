import {Action, ActionCreator, actionCreatorFactory} from './actions';

describe('actionCreatorFactory', () => {

  describe('action creator', () => {

    let actionCreator: ActionCreator<string>;

    beforeEach(() => {
      actionCreator = actionCreatorFactory('ACTION_TYPE');
    });

    it('has a type field', () => {
      expect(actionCreator.type).toBe('ACTION_TYPE');
    });

    describe('action', () => {

      let action: Action<string>;

      beforeEach(() => {
        action = actionCreator('ACTION PAYLOAD');
      });

      it('contains a type', () => {
        expect(action.type).toBe('ACTION_TYPE');
      });

      it('contains a payload', () => {
        expect(action.payload).toBe('ACTION PAYLOAD');
      });

    });

  });

});
