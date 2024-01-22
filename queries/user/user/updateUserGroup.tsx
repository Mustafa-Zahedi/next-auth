export const UPDATE_USER_GROUP = `
  mutation UpdateUserGroup(
    $uuid: String!
    $data: UserGroupInput!
    $permissions: [String!]
  ) {
    updateUserGroup(uuid: $uuid, data: $data, permissions: $permissions) {
      id
      uuid
      name
      slug
      createdAt
      updatedAt
    }
  }
`;
