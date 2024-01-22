export const USER = `
  query User($uuid: String!) {
    user(uuid: $uuid) {
      id
      uuid
      email
      firstName
      lastName
      nickName
      about
      title
      imageUrl
      createdAt
      updatedAt
      deletedAt
      settings
    }
  }
`;
