export default `
type UserSubscription {
  id: ID!
  createdAt: Date!
  type: UserSubscriptionType!
  features: [ApplicationFeature]
}
`;
