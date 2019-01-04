import { Links } from '../../../../types/Links';
import { actionCreatorFactory } from '../../actions';

export const storeLinksAction = actionCreatorFactory<Links>('STORE_LINKS');
