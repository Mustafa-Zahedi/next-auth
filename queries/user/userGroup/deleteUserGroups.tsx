export const DELETE_USER_GROUP = `
  mutation DeleteUserGroups($uuid: [String!]) {
    deleteUserGroups(uuid: $uuid)
  }
`;

// mutation DeleteUserGroups($uuid: [String!]) {
//   deleteUserGroups(uuid: $uuid)
// }
