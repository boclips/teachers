import { Links } from 'src/types/Links';
import { actionCreatorFactory } from '../../actions';

export const storeLinksAction = actionCreatorFactory<Links>('STORE_LINKS');
