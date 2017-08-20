export default `
type UserPersonalInformation {
  id: ID!
  firstName: String
  lastName: String
  phoneNumber: String
  birthDate: Date
  age: Int
  birthPlace: String
  socialSecurityNumber: String
  taxNumber: String
  mothersMaidenName: String
}

input UserPersonalInformationInput {
  firstName: String
  lastName: String
  phoneNumber: String
  birthDate: Date
  birthPlace: String
  socialSecurityNumber: String
  taxNumber: String
  mothersMaidenName: String
}
`;
