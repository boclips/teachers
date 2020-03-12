import convertUserResource from './convertUserResource';

describe('convertUserResource', () => {
  it('converts a UserResource to a UserProfile', () => {
    const userResource = {
      id: 'user-id',
      firstName: 'Fred',
      lastName: 'Jones',
      ages: [7, 8, 9],
      subjects: [{ id: 'subject-id-1' }],
      email: 'tester@boclips.com',
      organisationAccountId: 'org-id',
      organisation: {
        name: 'School Name',
        type: 'SCHOOL',
        state: null,
        country: { id: 'GBR', name: 'United Kingdom', states: null },
      },
      teacherPlatformAttributes: { shareCode: 'N501' },
      _links: {
        self: {
          href: 'https://api.staging-boclips.com/v1/users/user-id',
        },
        profile: {
          href: 'https://api.staging-boclips.com/v1/users/user-id',
        },
        contracts: {
          href: 'https://api.staging-boclips.com/v1/users/user-id/contracts',
        },
      },
    };

    const userProfile = convertUserResource(userResource);

    expect(userProfile.id).toEqual('user-id');
    expect(userProfile.email).toEqual('tester@boclips.com');
    expect(userProfile.firstName).toEqual('Fred');
    expect(userProfile.lastName).toEqual('Jones');
    expect(userProfile.subjects).toEqual(['subject-id-1']);
    expect(userProfile.ages).toEqual([7, 8, 9]);
    expect(userProfile.country.id).toEqual('GBR');
    expect(userProfile.country.name).toEqual('United Kingdom');
    expect(userProfile.state).toEqual(null);
    expect(userProfile.school.name).toEqual('School Name');
    expect(userProfile.shareCode).toEqual('N501');
  });
});
