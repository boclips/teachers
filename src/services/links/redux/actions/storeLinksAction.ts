import { actionCreatorFactory } from '../../../../redux/actions';
import { Links } from '../../Links';

export const storeLinksAction = actionCreatorFactory<Links>('STORE_LINKS');
