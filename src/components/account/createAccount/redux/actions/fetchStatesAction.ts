import { actionCreatorFactory } from '../../../../../app/redux/actions';
import { Country } from '../../../../../types/Country';

export const fetchStatesAction = actionCreatorFactory<Country>('FETCH_STATES');
