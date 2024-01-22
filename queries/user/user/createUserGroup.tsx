export const CREATE_USER_GROUPS = `
  mutation CreateUserGroup($data: UserGroupInput!, $permissions: [String!]) {
    createUserGroup(data: $data, permissions: $permissions) {
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
