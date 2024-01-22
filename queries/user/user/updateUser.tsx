export const UPDATE_USER = `
  mutation UpdateUser(
    $uuid: String!
    $data: UserInput!
    $properties: [UserPropertyInput!]
    $settings: JSON
    $groups: [String!]
  ) {
    updateUser(
      uuid: $uuid
      data: $data
      properties: $properties
      settings: $settings
      groups: $groups
    ) {
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
      settings
      groups {
        uuid
        name
        slug
      }
    }
  }
`;
