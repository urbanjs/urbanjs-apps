export const mocks = {
  Query: () => ({
    user: () => ({
      id: '123123',
      personalInformation: {
        gender: 'female',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@gmail.com',
        phoneNumber: '+1 866-478-1805',
        birthDate: new Date('1990-01-30').toISOString(),
        birthPlace: 'Boston',
        socialSecurityNumber: '043-001-012',
        taxNumber: '1231232353452',
        mothersMaidenName: 'Ping Mary'
      },
      metadata: {
        lastSeen: new Date().toISOString()
      },
      settings: {
        preferredLocale: 'hu',
        galleryIdToShow: 'zingvoGallery'
      },
      facebookRegistration: {
        id: '123123123',
        permissions: [
          'PUBLIC_PROFILE',
          'USER_PHOTOS',
          'USER_MANAGED_GROUPS',
          'PAGES_MESSAGING',
          'PAGES_MESSAGING_SUBSCRIPTIONS'
        ]
      },
      subscription: {
        id: '123123',
        createdAt: new Date().toISOString(),
        type: 'FREE',
        features: [
          'CORE'
        ]
      },
      addresses: [
        {
          id: '123123',
          type: 'MAILING',
          country: 'US',
          city: 'Boston',
          postcode: '02210',
          street: 'Summer st 320'
        }
      ],
      portfolio: {
        height: 168,
        chest: 90,
        waist: 60,
        hip: 90,
        foot: 25,
        eye: 'BROWN',
        hair: 'BLACK',
        hasTattoo: true,
        hasPiercing: true,
        hasDrivingLicense: true,
        isStudent: true,
        languages: [
          {
            language: 'ENGLISH',
            level: 'INTERMEDIATE'
          },
          {
            language: 'HUNGARIAN',
            level: 'NATIVE'
          }
        ],
        qualifications: [
          {
            name: 'Bostoni Általános Iskola',
            startDate: new Date('1996-01-30').toISOString(),
            endDate: new Date('2004-01-30').toISOString(),
            level: 'elementary'
          },
          {
            name: 'Bostoni Szakképző Iskola',
            startDate: new Date('2004-01-30').toISOString(),
            endDate: new Date('2008-01-30').toISOString(),
            level: 'vocational-secondary'
          }
        ],
        jobInterests: [
          'PROMOTION'
        ]
      },
      jobs: [
        {
          id: '123234',
          createdBy: {
            id: '123123'
          },
          createdAt: new Date().toISOString(),
          status: 'open', // draft
          dueDate: new Date().toISOString(),
          labels: ['promotion'],
          title: 'Siófok promóció',
          teaser: 'Sziasztok, Szombaton 17:00-24:00 óráig keresek Siófokra 4 lányt promóciós munkára. Jelentkezni privát üzenetben tudtok. NEM Balaton Sound :) Köszi',
          options: [
            {
              id: '123',
              description: 'Hétköznap 8:00-15:00-ig, hétvégén 10:00-17:00-ig tart a munkaidő.',
              salary: {
                type: 'sum',
                value: 50000,
                currency: 'ft'
              },
              address: {
                addressId: 'current',
                country: 'US',
                city: 'Boston',
                postcode: '02210',
                street: 'Summer st 320'
              },
              startDate: new Date().toISOString(),
              endDate: new Date().toISOString(),
              participants: [
                {
                  id: '123123123',
                  status: 'WAITING_FOR_USER',
                  lastModified: new Date().toISOString(),
                  ratingOfUser: {
                    message: 'Nagyon ügyes volt',
                    point: 4
                  }
                },
                {
                  id: '123234',
                  status: 'ACCEPTED_BY_USER',
                  lastModified: new Date().toISOString()
                },
                {
                  id: '123234',
                  status: 'REJECTED_BY_USER',
                  lastModified: new Date().toISOString()
                },
                {
                  id: '123234',
                  status: 'ACCEPTED_BY_AGENCY',
                  lastModified: new Date().toISOString()
                },
                {
                  id: '123234',
                  status: 'REJECTED_BY_AGENCY',
                  lastModified: new Date().toISOString()
                }
              ]
            }
          ]
        }
      ]
    })
  })
};
