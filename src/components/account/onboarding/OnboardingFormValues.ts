export interface OnboardingSectionAttributes {
  pageIndex: number;
  title: string;
  description: string;
  illustrationSrc: string;
  fields: (keyof OnboardingFormValues)[];
  hasRequiredFields: boolean;
}

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  role: string;

  ageRange: string[];
  subjects: string[];

  country: string;
  state: string;
  schoolName: string;
  schoolId: string;

  hasOptedIntoMarketing: boolean;
  privacyPolicy: boolean;
}

export const OnboardingSections: OnboardingSectionAttributes[] = [
  {
    pageIndex: 0,
    title: 'Hello',
    description:
      'Before you get started, we’d like to get to know you a bit better to help you get the most out of Boclips for Teachers.',
    illustrationSrc: '/resources/teachers-waving.svg',
    fields: ['firstName', 'lastName', 'role'],
    hasRequiredFields: true,
  },
  {
    pageIndex: 1,
    title: 'Your students',
    description:
      'Tell us what you teach so we can help you find the most relevant videos for your classroom.',
    illustrationSrc: '/resources/dwarf-with-pencil.svg',
    fields: ['ageRange', 'subjects'],
    hasRequiredFields: false,
  },
  {
    pageIndex: 2,
    title: 'Your school',
    description:
      "We'd like to know where you teach so that we can provide your community with the most relevant resources.",
    illustrationSrc: '/resources/teacher-micromanaging.svg',
    fields: ['country', 'state', 'schoolName', 'schoolId'],
    hasRequiredFields: true,
  },
  {
    pageIndex: 3,
    title: 'Almost there!',
    description:
      'We’d love to find out about your experience using Boclips for Teachers. To do this, we’d like to ask for your opinion and send you information about our new features and similar products or services which may be of interest to you.',
    illustrationSrc: '/resources/teacher-presenting.svg',
    fields: ['hasOptedIntoMarketing', 'privacyPolicy'],
    hasRequiredFields: true,
  },
];
