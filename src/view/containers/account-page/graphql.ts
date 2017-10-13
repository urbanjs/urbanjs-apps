import { gql } from 'react-apollo';

export const updateUserMutation = gql`  
mutation updateUserPersonalInformation($userId: ID!, $data: UserPersonalInformationInput!) {
  updateUserPersonalInformation(userId: $userId, data: $data) {
    id
    firstName
    lastName
    birthDate
    phoneNumber
    birthPlace
    socialSecurityNumber
    taxNumber
    mothersMaidenName
  }
}`;

export const userQuery = gql`
query {
  user {
    id
    email
    displayName
    avatar
    personalInformation {
      id
      firstName
      lastName
      birthDate
      phoneNumber
      birthPlace
      socialSecurityNumber
      taxNumber
      mothersMaidenName
    }
  }
}`;
