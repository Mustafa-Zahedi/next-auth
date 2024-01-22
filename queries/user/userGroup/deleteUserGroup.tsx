export const DELETE_USER = `
  mutation DeleteUserGroup($uuid: String!) {
    deleteUserGroup(uuid: $uuid)
  }
`;
