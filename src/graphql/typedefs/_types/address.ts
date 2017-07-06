export default `
enum AddressType {
  MAILING
  DELIVERY
  BILLING
}

type Address {
  id: ID!
  type: AddressType!
  country: String!
  city: String!
  postcode: String!
  street: String!
}
`;
