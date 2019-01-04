import activateUser from '../../../../services/users/userActivator';
import { Links } from '../../../../types/Links';
import { sideEffect } from '../../actions';
import { storeLinksAction } from '../actions/storeLinksAction';

export default sideEffect(storeLinksAction, (_, links: Links) => {
  activateUser(links);
});
