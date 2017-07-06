export default `
type Job {
  id: ID!
  createdAt: Date!
  createdBy: User!
  dueDate: Date!
  labels: [String]
  title: String!
  teaser: String!
  options: [JobOption]
}
`;
