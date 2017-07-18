export default `
type JobOptionSalary {
  type: String!
  value: Int!
  currency: String!
}

type JobOption {
  id: ID!
  description: String!
  startDate: Date!
  endDate: Date!
  salary: JobOptionSalary!
  address: Address!
  participants: [JobParticipant]
}
`;
