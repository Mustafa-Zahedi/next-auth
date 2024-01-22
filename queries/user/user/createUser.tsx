export const CREATE_USER = `
  mutation CreateUser(
    $data: UserInput!
    $properties: [UserPropertyInput!]
    $settings: [UserSettingInput!]
  ) {
    createUser(data: $data, properties: $properties, settings: $settings) {
      id
      uuid
      title
      email
      firstName
      lastName
      nickName
      about
      imageUrl
      createdAt
      updatedAt
      deletedAt
      properties {
        id
        uuid
        userId
        key
        value
      }
    }
  }
`;
