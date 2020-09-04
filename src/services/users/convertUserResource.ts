import { Link } from '../../types/Link';
import { UserProfile } from './UserProfile';

export default function convertUserResource(resource: any): UserProfile {
  return {
    id: resource.id,
    firstName: resource.firstName,
    lastName: resource.lastName,
    email: resource.email,
    subjects: resource.subjects.map((subject) => subject.id),
    ages: resource.ages,
    country: resource.school?.country || null,
    state: resource.school?.state || null,
    school: {
      id: resource.school?.id,
      name: resource.school?.name || null,
    },
    shareCode: resource.teacherPlatformAttributes.shareCode,
    links: { self: new Link(resource._links.self) },
    role: resource.role,
    features: resource.features,
  };
}
