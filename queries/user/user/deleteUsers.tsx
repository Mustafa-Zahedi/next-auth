export const DELETE_USERS = `
  mutation DeleteUsers($uuid: [String!]) {
    deleteUsers(uuid: $uuid)
  }
`;
