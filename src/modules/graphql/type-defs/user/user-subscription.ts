export default `
enum UserSubscriptionType {
  FREE
}

type UserSubscription {
  id: ID!
  createdAt: Date!
  expiresAt: Date!
  type: UserSubscriptionType!
  features: [ApplicationFeature]
}
`;
