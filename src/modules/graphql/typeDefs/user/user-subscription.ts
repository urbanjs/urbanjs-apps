export default `
type UserSubscription {
  id: ID!
  createdAt: Date!
  expiresAt: Date!
  type: UserSubscriptionType!
  features: [ApplicationFeature]
}
`;
