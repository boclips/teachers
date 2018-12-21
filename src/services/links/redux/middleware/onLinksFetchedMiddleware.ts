import { sideEffect } from '../../../../redux/actions';
import activateUser from '../../../users/userActivator';
import { Links } from '../../Links';
import { storeLinksAction } from '../actions/storeLinksAction';

export default sideEffect(storeLinksAction, (_, links: Links) => {
  activateUser(links);
});
