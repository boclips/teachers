import axios from 'axios';
import { Link } from '../../types/Link';

export default function validateShareCode(
  validateLink: Link,
  shareCode: string,
): Promise<boolean> {
  return axios
    .get(validateLink.getTemplatedLink({ shareCode }))
    .then(() => true)
    .catch(() => false);
}
