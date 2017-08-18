export default `
type User {
  id: ID!
  createdAt: Date!
  facebookId: String!
  email: Email!
  displayName: String!
  avatar: String!
  subscription: UserSubscription
  personalInformation: UserPersonalInformation
  settings: UserSettings
  portfolio: UserPortfolio
  addresses: [Address]
  jobs: [Job]
}
`;
