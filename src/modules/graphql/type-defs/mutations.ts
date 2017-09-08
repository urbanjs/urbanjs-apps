export default `
type Mutation {
  updateUserPersonalInformation(
    userId: ID!, data: UserPersonalInformationInput!): UserPersonalInformation
}
`;
