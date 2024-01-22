export const USER_TABLE = `
  query UsersTable($take: Int!, $skip: Int!, $order: [UserOrderBy!], $filter: UserFilter, $userUUID: String!, $key: String!) {
    users(take: $take, skip: $skip, order: $order, filter: $filter) {
      items {
        id
        uuid
        firstName
        lastName
        email
        createdAt
        updatedAt
      }
      pagination {
        totalItems
        totalPages
        skip
      }
    }
    userSetting(userUUID: $userUUID, key: $key) {
      id
      uuid
      userId
      key
      value
    }
  }
`;
