import { storeLinksAction } from '../config/ConfigLoader';
import { sideEffect } from '../redux/actions';
import activateUser from '../users/userActivator';
import { Links } from './Links';

export default sideEffect(storeLinksAction, (_, links: Links) => {
  activateUser(links);
});
