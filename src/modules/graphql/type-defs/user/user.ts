export default `
type User {
  id: ID!
  createdAt: Date!
  facebookId: String!
  email: Email!
  displayName: String!
  avatar: String!
  facebookPermissions(id: String): [FacebookPermission]!
  photos: [Photo]!
  subscription: UserSubscription!
  personalInformation: UserPersonalInformation!
  portfolio: UserPortfolio!
  addresses: [Address]
  jobs: [Job]
}
`;
