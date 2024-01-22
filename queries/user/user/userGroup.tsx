export const USER_GROUP = `
  query UserGroup($uuid: String!) {
    userGroup(uuid: $uuid) {
      id
      uuid
      name
      slug
      createdAt
      updatedAt
      permissions {
        permission
      }
    }
  }
`;
