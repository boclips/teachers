import { Link } from '../../types/Link';
import { UserProfile } from './UserProfile';

export default function convertUserResource(resource: any): UserProfile {
  return {
    id: resource.id,
    firstName: resource.firstName,
    lastName: resource.lastName,
    email: resource.email,
    analyticsId: resource.analyticsId,
    links: { self: new Link(resource._links.self) },
  };
}
