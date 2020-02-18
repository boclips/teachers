import axios from 'axios';
import { Link } from 'src/types/Link';

export default function validateShareCode(
  validateLink: Link,
  userId: string,
  shareCode: string,
): Promise<boolean> {
  return axios
    .get(validateLink.getTemplatedLink({ shareCode, id: userId }))
    .then(() => true)
    .catch(() => false);
}
