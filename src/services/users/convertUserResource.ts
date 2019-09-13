import { Link } from '../../types/Link';
import { UserProfile } from './UserProfile';

export default function convertUserResource(resource: any): UserProfile {
  return {
    id: resource.id,
    firstName: resource.firstName,
    lastName: resource.lastName,
    email: resource.email,
    subjects: resource.subjects,
    ages: resource.ages,
    analyticsId: resource.analyticsId,
    links: { self: new Link(resource._links.self) },
  };
}
