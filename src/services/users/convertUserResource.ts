import { Link } from 'src/types/Link';
import { UserProfile } from './UserProfile';

export default function convertUserResource(resource: any): UserProfile {
  return {
    id: resource.id,
    firstName: resource.firstName,
    lastName: resource.lastName,
    email: resource.email,
    subjects: resource.subjects.map(subject => subject.id),
    ages: resource.ages,
    analyticsId: resource.analyticsId,
    country: resource.organisation ? resource.organisation.country : null,
    state: resource.organisation ? resource.organisation.state : null,
    school: {
      id: resource.organisationAccountId,
      name: resource.organisation ? resource.organisation.name : null,
    },
    shareCode: resource.teacherPlatformAttributes.shareCode,
    links: { self: new Link(resource._links.self) },
  };
}
