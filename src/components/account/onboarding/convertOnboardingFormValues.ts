import { OnboardingFormValues } from 'src/components/account/onboarding/OnboardingFormValues';
import { UpdateUserRequest } from 'src/services/users/updateUser';
import { AgeRange } from 'src/types/AgeRange';
import { extractContainedAges } from 'src/components/ageRanges/extractContainedAges';
import { UNKNOWN_SCHOOL } from 'src/components/account/form/SchoolForm';

export const convertFormValues = (
  values: OnboardingFormValues,
): Partial<UpdateUserRequest> => {
  const ageRanges = (values.ageRange as string[])?.map((it) =>
    AgeRange.fromJson(it),
  );
  const ages = ageRanges ? extractContainedAges(ageRanges) : [];
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    ages,
    subjects: values.subjects,
    country: values.country,
    state: values.state,
    schoolName: values.schoolName,
    schoolId: values.schoolId === UNKNOWN_SCHOOL ? null : values.schoolId,
    hasOptedIntoMarketing: values.hasOptedIntoMarketing,
    role: values.role,
  };
};
