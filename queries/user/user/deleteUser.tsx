export const DELETE_USER = `
  mutation DeleteUser($uuid: String!) {
    deleteUser(uuid: $uuid)
  }
`;
