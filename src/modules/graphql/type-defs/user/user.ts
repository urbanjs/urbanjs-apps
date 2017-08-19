export default `
type User {
  id: ID!
  createdAt: Date!
  facebookId: String!
  email: Email!
  displayName: String!
  avatar: String!
  subscription: UserSubscription!
  personalInformation: UserPersonalInformation!
  portfolio: UserPortfolio!
  addresses: [Address]
  jobs: [Job]
}
`;
